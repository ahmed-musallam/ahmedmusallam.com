---
title: "How to force AEM to not process CSS URLs"
description: "A way to keep CSS url() unprocessed"
date: 2017-08-10T00:00:00-00:00
type: "single"
---

> TL;DR prefix your url with `absolute`, example: `url(absolute:/path/to/image)`

By default, AEM CSS processor will transform the CSS URL functional notation “url()” into a relative URL to the ClientLibrary, if the URL was relative to begin with, ie, it does not start with “/”

Please visit [Perficient's site for the full article I originally wrote](https://blogs.perficient.com/adobe/2017/08/10/how-to-force-aem-to-not-process-css-urls/)