FROM node:22-bookworm
WORKDIR /workspaces/aurora-web
RUN mkdir -p node_modules /home/node/.npm \
    && chown -R node:node /workspaces/aurora-web /home/node/.npm
USER node
EXPOSE 5173
CMD ["sh", "-c", "npm ci --no-audit --no-fund && npm run dev -- --host 0.0.0.0 --port 5173 --strictPort"]
