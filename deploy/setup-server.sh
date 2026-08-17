#!/usr/bin/env bash
#
# GameVerse — Oracle Cloud Free Tier (Ubuntu 24.04) server bootstrap
# ==================================================================
# Run ONCE on the server as root:
#   sudo bash setup-server.sh
#
# After this script: upload the project source, then follow the
# "next steps" printed at the end.
#
set -euo pipefail

NODE_MAJOR=24
APP_DIR=/var/www/gameverse
APP_USER=gameverse

echo "==> System update"
apt-get update -y
apt-get upgrade -y

echo "==> Base packages"
apt-get install -y curl git unzip ca-certificates build-essential

echo "==> Node.js ${NODE_MAJOR} (NodeSource)"
curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
apt-get install -y nodejs
node -v
npm -v

echo "==> PM2 (process manager)"
npm install -g pm2

echo "==> Caddy (automatic HTTPS reverse proxy)"
apt-get install -y debian-keyring debian-archive-keyring apt-transport-https gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -y
apt-get install -y caddy

echo "==> App user + directory"
id -u "${APP_USER}" &>/dev/null || useradd -m -s /bin/bash -d "/home/${APP_USER}" "${APP_USER}"
mkdir -p "${APP_DIR}"
chown -R "${APP_USER}:${APP_USER}" "${APP_DIR}"

echo
echo "============================================================"
echo " NEXT STEPS (run these manually, in order):"
echo "============================================================"
echo
echo " 1) From your local machine, upload the project source:"
echo "      scp -i <your-key>.pem gameverse-src.tar.gz ubuntu@<SERVER_IP>:~"
echo
echo " 2) Extract and install:"
echo "      sudo mkdir -p ${APP_DIR}"
echo "      sudo tar -xzf ~/gameverse-src.tar.gz -C ${APP_DIR}"
echo "      sudo chown -R ${APP_USER}:${APP_USER} ${APP_DIR}"
echo "      cd ${APP_DIR}"
echo "      sudo -u ${APP_USER} npm ci"
echo "      sudo -u ${APP_USER} npm run build"
echo
echo " 3) Start with PM2 as the app user:"
echo "      sudo -u ${APP_USER} pm2 start npm --name gameverse -- start"
echo "      sudo -u ${APP_USER} pm2 save"
echo "      sudo env PATH=\$PATH:/usr/bin pm2 startup systemd -u ${APP_USER} --hp /home/${APP_USER}"
echo
echo " 4) Test locally on the server:"
echo "      curl -I http://localhost:3000"
echo
echo " 5) When your domain (gameverse.pro) points to this server,"
echo "    enable Caddy by creating /etc/caddy/Caddyfile:"
echo
echo "      gameverse.pro {"
echo "          reverse_proxy 127.0.0.1:3000"
echo "      }"
echo "      :80 {"
echo "          reverse_proxy 127.0.0.1:3000"
echo "      }"
echo
echo "    then: sudo systemctl reload caddy"
echo
echo "    Caddy will fetch HTTPS certificates automatically."
echo "============================================================"
