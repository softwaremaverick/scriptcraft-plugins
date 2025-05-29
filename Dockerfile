FROM tclavier/scriptcraft

ARG JAVA_VERSION=8
ADD https://corretto.aws/downloads/latest/amazon-corretto-$JAVA_VERSION-x64-linux-jdk.deb /opt/coretto/amazon-corretto.deb
RUN dpkg --install /opt/coretto/amazon-corretto.deb

ARG MINECRAFT_VERSION=1.17
RUN java -jar BuildTools.jar --rev $MINECRAFT_VERSION --compile craftbukkit

ARG SCRIPTCRAFT_REPO_OWNER=walterhiggins
ARG SCRIPTCRAFT_VERSION=3.4.0
ADD https://github.com/$SCRIPTCRAFT_REPO_OWNER/ScriptCraft/releases/download/$SCRIPTCRAFT_VERSION/scriptcraft.jar /opt/minecraft/plugins/scriptcraft.jar

COPY scripts /opt/minecraft/scriptcraft/plugins/myworld
