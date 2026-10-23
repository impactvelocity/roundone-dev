#!/usr/bin/env bash
# Turns the ElevenLabs Flint takes (assets/vo/flint/<id>.mp3) into the placed lines
# (assets/vo/<id>.wav): silence trimmed off both ends, played 1.2x with pitch kept
# (the main film's voice runs about 1.2x), loudness-normalized to -16 LUFS.
#   bash kit/prep-vo.sh
# The sandbox take keeps only its first sentence ("…and runs the tests."); its second
# ("Each step lands in the trace…") starts at 6.62 s of the 1.2x take.
set -euo pipefail
cd "$(dirname "$0")/../assets/vo"
trim="silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse"
for id in agent sandbox tavily verdict; do
  cut=""
  [ "$id" = sandbox ] && cut=",atrim=0:6.47,afade=t=out:st=6.42:d=0.05"
  ffmpeg -v error -y -i "flint/$id.mp3" -af "$trim,atempo=1.2$cut,loudnorm=I=-16:TP=-1.5:LRA=11" -ar 48000 "$id.wav"
  printf '%-8s %ss\n' "$id" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$id.wav")"
done
