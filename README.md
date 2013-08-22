SODCtrl
=========

Server-On-Demand Controller is a tool to boot/control on-demand server instances such as Gandi or Amazon AWS

Usage
======
To boot or shut down a server, you may use the following:
`$ sodctrl boot -s server01`
`$ sodctrl shutdown -s server01`

Alternatively, you may create profiles in `./profiles.json' to act on multiple servers at once. The format for profiles.json is as follows:


    {
        "beta": {
            "servers": ["web01", "db01"]
        },
        "stage": {
            "servers": ["web01", "db01"]
        }
    }

These may be referenced with the -p flag:
`$ sodctrl boot -p beta`
`$ sodctrl shutdown -p beta`
