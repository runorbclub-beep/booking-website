export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Default to index.html for root path
    let path = url.pathname;
    if (path === '/') {
      path = '/index.html';
    }

    // Try to get the asset from the Assets binding
    const asset = await env.ASSETS.fetch(new Request(path, request));

    // If asset not found, return 404
    if (!asset || asset.status === 404) {
      return new Response('Not Found', { status: 404 });
    }

    return asset;
  },
};
