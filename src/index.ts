import { KeyObject } from "node:crypto";

const UPSTREAMS: Record<string, string> = {
	main: "http://server.tycoon.community:30120",
	beta: "http://server.tycoon.community:30125",
};

export default {
	async fetch(request: Request): Promise<Response> {
		const private_key = request.headers.get("x-tycoon-key");
		if (private_key !== null && (private_key.length < 10 || private_key.length > 50)) {
			return new Response("Invalid private key", { status: 400 });
		}

		const public_key = request.headers.get("x-tycoon-public-key");
		if (public_key !== null && (public_key.length < 10 || public_key.length > 50)) {
			return new Response("Invalid public key", { status: 400 });
		}

		const url = new URL(request.url);
		const [, prefix, ...rest] = url.pathname.split("/");

		const upstream = UPSTREAMS[prefix];
		if (!upstream) {
			return new Response("Not found", { status: 404 });
		}

		const targetUrl = new URL(upstream);
		url.hostname = targetUrl.hostname;
		url.port = targetUrl.port;
		url.protocol = targetUrl.protocol;
		url.pathname = "/" + rest.join("/");

		return fetch(new Request(url, request));
	}
}
