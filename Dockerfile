FROM    ubuntu:latest
RUN     apt-get -y update
RUN     apt-get -y install wget pngquant
RUN     wget -O /tmp/node-v0.10.28.tar.gz http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x64.tar.gz
RUN     tar -C /usr/local/ --strip-components=1 -zxvf /tmp/node-v0.10.28.tar.gz
RUN     rm /tmp/node-v0.10.28.tar.gz
RUN     /usr/local/bin/npm install pngquant

ENV     SERVER_PORT 80
ENV     NUMBER_OF_COLORS 256

ADD     ./pngquant-server.js /pngquant-server.js

EXPOSE  80

CMD     /usr/local/bin/node /pngquant-server.js
