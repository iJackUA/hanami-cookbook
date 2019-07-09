---
title: Getting started
lang: en-US
sidebarDepth: 0
---

# Getting started

It is an opinionated list of recipes to implement in your Hanami project.

::: warning If you are new to Hanami, you should definitely start from official docs
they provide enough information to grasp basic concepts
* [hanamirb.org](http://hanamirb.org/)
* [guides.hanamirb.org](https://guides.hanamirb.org/)
:::

## Main goals

* provide an exemplary implementation
* collect experience
* avoid issues already faced by others
* create a source of technological inspiration

::: danger The cookbook is under construction
A lot of recipes are empty yet. Information for them exists, but it should be carefully extracted. This process takes time, so be patient, please.
:::

## Why things are so complicated?

They are not complicated! It is just the first impression, based on false belief circulating in the Ruby community.

Someone just has told you that web development should be "easy and fun".
But it should be "simple and predictable" instead.

* With Hanami you **get** *almost* **full control** on your Ruby web app - **with all the power and all the responsibilities**.
* With Hanami you **must** understand what you are doing and how things are working!
* With Hanami, you are making your app architecture, but not "your framework does you" 😅

Hanami's ecosystem is still very young. 2 years ago the only source of information about "non-straightforward" cases was [**davydovanton/awesome-hanami**](https://github.com/davydovanton/awesome-hanami). But it has mostly links collections and a lot of code-examples were found just "around the internet".

That's why this cookbook was made.

## Should I switch to Hanami?

Being honest, I can not just say "go for it!". You should consider a lot of things before starting a real commercial project with Hanami.

First of all, you definitely should start "playing" with Hanami, start building some realistic pet-projects with Hanami. Being used to the architecture concepts, measuring your velocity and feelings.

Unfortunately, jumping off the cliff into Hanami after being used to Rails Way can be painful. Not only because you have to be ready for a paradigm shift, but also to the lack of support and ready-made solutions.

One of the biggest challenges is when you are searching for "act-as-something"/"blahblah-rails" alternative - very often there are only a few and not well developed. Or you need to be very careful to avoid some gem to pull "activesupport" as a dependency (if you want to have completely pure codebase :)).


## Exemplar Hanami code repositories

* [**radar/twist-v2**](https://github.com/radar/twist-v2)
* [**davydovanton/cookie_box**](https://github.com/davydovanton/cookie_box)
* [**davydovanton/rubyjobs.dev**](https://github.com/davydovanton/rubyjobs.dev)
* List of projects on [**davydovanton/awesome-hanami**](https://github.com/davydovanton/awesome-hanami#hanami-project-list)

## Want to learn more?

I have a separate guide about better (than RailsWay™ 🙃) practices
[**Ruby Web Dev: The Other Way**](http://rwdtow.stdout.in/) ([rwdtow.stdout.in](http://rwdtow.stdout.in/)). Give it a try, if you like all that "Awesome ..." lists, but with an attempt to provide comments and reasoning about concepts.

## Can I help?

While this cookbook is still in progress and list of topics is not finalized yet - I kindly ask to [start a GitHub Issue discussion](https://github.com/iJackUA/hanami-cookbook/issues) before writing and submitting something here.

In [**About**](/pages/about.md) section I've placed some methods for tips.
