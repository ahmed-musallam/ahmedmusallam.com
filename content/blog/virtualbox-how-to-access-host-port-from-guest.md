---
title: "VirtualBox: How To Access Host Port From Guest"
description: "A short story of how I built this site."
date: 2019-03-21T11:00:10-05:00
type: "single"
tags:
  - virtualbox
---

I'm always working on a Mac machine, but sometimes I need to debug an issue that only affects windows machines and more specifically IE. For that, I usually use [VirtualBox](https://www.virtualbox.org/) with a [free VM from Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) for debugging.

I never remember what to do to access a server running on my Mac from my Windows VM. So I'm writing this, for me. And I guess for you too!


## Port Forwarding
- Shutdown your VM
- Open `settings` for the VM and select `network`
- make Sure the `Attached to` dropdown is set to `NAT`
- expand `Advanced`
- Click `Port Forwarding`
- Add a new rule. In my case, I want to forward port `4502` on my guest to port `4502` on my host. leave the IP fields empty


![settings](/img/virtualbox-settings.png)

![settings](/img/virtualbox-network.png)

![settings](/img/virtualbox-port-forwarding.png)

## Finding Your Host Local IP
Now you need to find the host (Mac) local IP that is assigned to you by your router, this typically starts with `192`

you can find this in MacOs by following this [SO answer](https://apple.stackexchange.com/a/212207/255822) point **#3**

basically run the one of the following commands to get your local IP:

> - `ipconfig getifaddr en0` if connected via a wireless connection.
> - `ipconfig getifaddr en1` if connected via ethernet.
> - `ipconfig getifaddr en3` if connected via a Thunderbolt-to-ethernet adaptor.

## Accessing Server running on Your Host From Your Guest

now that you have the IP, you can use it to access the forwarded port from your guest VM.

In my case, the IP of the host turned out to be `192.168.10.20` so, in my windows VM I can access the URL: `http://192.168.10.20:4502`!


