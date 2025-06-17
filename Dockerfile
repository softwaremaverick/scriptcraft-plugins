FROM tclavier/scriptcraft

ARG JAVA_VERSION
ADD https://corretto.aws/downloads/latest/amazon-corretto-$JAVA_VERSION-x64-linux-jdk.deb /opt/coretto/amazon-corretto.deb
RUN dpkg --install /opt/coretto/amazon-corretto.deb

ARG MINECRAFT_VERSION
RUN java -jar BuildTools.jar --rev $MINECRAFT_VERSION --compile craftbukkit

ARG SCRIPTCRAFT_REPO_OWNER
ARG SCRIPTCRAFT_VERSION
ADD https://github.com/$SCRIPTCRAFT_REPO_OWNER/ScriptCraft/releases/download/$SCRIPTCRAFT_VERSION/scriptcraft.jar /opt/minecraft/plugins/scriptcraft.jar

COPY scripts /opt/minecraft/scriptcraft/plugins/myworld
