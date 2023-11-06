# Mindustry Osmium<sup>76</sup>

# 2023/11/05 UNPATCHED 
## FOR SERVER OWNERS:
### Check if more than 2 connections from same ip and if so, ban them.

This has been mentally a insane amount of drugs and a complete waste of time maybe.
## Fun facts:
Due to the nature of the atatcks being on the application layer, this is not classified as a denial of service attack, but rather a "Common Vulnerability and Exploit" proof of concept (on a regular basis this could be fixed by limiting the
amount of players on 1 ip)

### made by Volas171
### code reused from nekonya's version

## Setup:
1. Have NodeJS 16+ installed
2. Run `npm install` in the root directory
3. Run `node src/main/node/index.ts (target)` to execute the bots
4. Setup ports on index.js

## Features:
- UUID scrambler
- multi version support
- ability to spam chat (gets ratelimited)

## Customization:
check out `src/main/node/index.ts`

# ONLY FOR EDUCATIONAL PURPOSES, NO RESPONSIBILITY FOR ANYTHING YOU DO WITH THIS
