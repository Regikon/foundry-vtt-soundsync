# Foundry VTT sound sync

This is a small foundry module, which synchronizes
music playback of all users in the game.

In the vanilla foundry, when some user are logged in,
their foundry client starts all tracks set by the GM
from the beginning, so the music between the GM and
other players can be desynchronized.

You can add it to your VTT with [a link to module.json](https://raw.githubusercontent.com/Regikon/foundry-vtt-soundsync/master/module.json)

## How to use

Basically, you don't have to manually use it. When
the new user logged in, the plugin sends info
about current playback to all users and the
music is synced. But, if the user has slow PC,
there might be some delay of couple of seconds
caused by loading the client.

If GM wants to manually trigger the
synchonization, they should pause the game.
