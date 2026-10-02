/**
 * Crescimento "como seiva" do logo árvore-cérebro (usado na abertura e nas raízes do rodapé).
 *
 * Um mapa geodésico pré-calculado (webp em tons de cinza) guarda, para cada ponto do desenho,
 * a distância AO LONGO dos galhos a partir da base do tronco. O shader revela tudo cuja
 * distância é menor que `p`, com uma frente de luz ("seiva") e, opcionalmente, um pulso `q`.
 * O contorno vem do próprio path vetorial do logo, desenhado no tamanho exato do canvas,
 * então a borda é nítida em qualquer tela.
 */
import { LOGO_PATH } from "../components/logoPath";

type RGB = [number, number, number];
export interface OpcoesCrescimento {
  /** Recorte do viewBox do logo que o canvas mostra: [x, y, largura, altura]. */
  recorte?: [number, number, number, number];
  cor?: RGB;      // cor final do desenho
  seiva?: RGB;    // cor da frente que avança
  pulso?: RGB;    // cor do pulso de luz
  /** 0–1: intensidade da frente de luz. */
  forcaSeiva?: number;
  /** 0–1: intensidade do pulso. 0 desliga. */
  forcaPulso?: number;
}

const hex = (c: RGB) => c.map((v) => (v / 255).toFixed(4)).join(", ");

export function carregarImagem(src: string, limite = 1500): Promise<HTMLImageElement | null> {
  return new Promise((ok) => {
    const img = new Image();
    const t = setTimeout(() => ok(null), limite);
    img.onload = () => { clearTimeout(t); ok(img); };
    img.onerror = () => { clearTimeout(t); ok(null); };
    img.src = src;
  });
}

export function criarCrescimento(canvas: HTMLCanvasElement, mapa: HTMLImageElement, o: OpcoesCrescimento = {}) {
  const [rx, ry, rw, rh] = o.recorte ?? [0, 0, 672, 760];
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;

  const vs = `attribute vec2 p; varying vec2 uv;
    void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`;
  const fs = `precision highp float; varying vec2 uv;
    uniform sampler2D uG; uniform sampler2D uM; uniform float uP; uniform float uQ;
    const vec3 cF = vec3(${hex(o.cor ?? [31, 74, 46])});
    const vec3 cS = vec3(${hex(o.seiva ?? [143, 204, 164])});
    const vec3 cL = vec3(${hex(o.pulso ?? [200, 240, 210])});
    const float fS = ${(o.forcaSeiva ?? 0.92).toFixed(3)};
    const float fP = ${(o.forcaPulso ?? 0.88).toFixed(3)};
    void main(){
      float m = texture2D(uM, uv).a;
      if (m < .003) { gl_FragColor = vec4(0.); return; }
      float t = texture2D(uG, uv).r;
      float d = uP - t;
      float rev = smoothstep(-.004, .01, d);
      float seiva = exp(-max(d, 0.) * 26.) * rev;
      float x = (uQ - t) * 34.;
      float pulso = exp(-x * x) * step(-.2, uQ);
      vec3 c = mix(cF, cS, seiva * fS);
      c = mix(c, cL, pulso * fP);
      float a = m * rev;
      gl_FragColor = vec4(c * a, a);
    }`;
  const sh = (tipo: number, src: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const pr = gl.createProgram()!;
  gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = (unidade: number, fonte: TexImageSource) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unidade);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
    return t;
  };
  tex(0, mapa);
  gl.uniform1i(gl.getUniformLocation(pr, "uG"), 0);
  gl.uniform1i(gl.getUniformLocation(pr, "uM"), 1);
  const uP = gl.getUniformLocation(pr, "uP"), uQ = gl.getUniformLocation(pr, "uQ");

  const caminho = new Path2D(LOGO_PATH);
  let texM: WebGLTexture | null = null;
  const mascara = () => {
    const c = document.createElement("canvas");
    c.width = canvas.width; c.height = canvas.height;
    const x = c.getContext("2d")!;
    const sx = c.width / rw, sy = c.height / rh;
    x.setTransform(sx, 0, 0, sy, -rx * sx, -ry * sy);
    x.fillStyle = "#fff";
    x.fill(caminho);
    if (texM) gl.deleteTexture(texM);
    texM = tex(1, c);
  };
  mascara();

  return {
    mascara,
    desenhar(p: number, q = -1) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uP, p);
      gl.uniform1f(uQ, q);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    liberar() { gl.getExtension("WEBGL_lose_context")?.loseContext(); },
  };
}
