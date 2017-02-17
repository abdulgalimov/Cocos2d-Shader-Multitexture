#ifdef GL_ES
precision lowp float;
#endif

varying vec2 v_texCoord;

uniform sampler2D CC_Texture1;
uniform vec2 u_noise_pos;
uniform mat3 u_matrix_noise;

void main(void) {
    vec4 colorOriginal = texture2D(CC_Texture0, v_texCoord);
	//
	vec2 coordNoise = (u_matrix_noise * vec3(v_texCoord.xy, 1.0)).xy;
	vec4 colorNoise = texture2D(CC_Texture1, coordNoise + u_noise_pos);
	//
	float gray = colorOriginal.r * 0.299 + colorOriginal.g * 0.587 + colorOriginal.b * 0.114;
	//
	float a = 1.0-(colorNoise.r+colorNoise.g+colorNoise.b)/4.0;
	gl_FragColor = vec4(gray, gray, gray, colorOriginal.a*a);
}