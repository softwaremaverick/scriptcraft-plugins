FROM tclavier/scriptcraft

ARG MINECRAFT_VERSION=1.17
ARG SCRIPTCRAFT_VERSION=3.4.0
ARG JAVA_VERSION=8

ADD https://corretto.aws/downloads/latest/amazon-corretto-$JAVA_VERSION-x64-linux-jdk.deb /opt/coretto/amazon-corretto.deb
RUN dpkg --install /opt/coretto/amazon-corretto.deb

RUN java -jar BuildTools.jar --rev $MINECRAFT_VERSION --compile craftbukkit
ADD https://github.com/walterhiggins/ScriptCraft/releases/download/$SCRIPTCRAFT_VERSION/scriptcraft.jar /opt/minecraft/plugins/scriptcraft.jar

ADD scripts /minecraft/scriptcraft/plugins/myworld