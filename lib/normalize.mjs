import { resources } from './constants.mjs'

/**
 * Generates a normalizer from an array of rules.
 * The normalizer will return the first matching
 * rule normalized value.
 *
 * @see multiNormalizer
 */
export const uniNormalizer = (rules, shouldThrow = false) => (value) => {
    if (!value) {
        return value
    }

    for (let rule of rules) {
        const [pattern, normalized] = rule
        if (value.match(pattern) !== null) {
            return normalized
        }
    }

    if (shouldThrow) {
        throw new Error(`no match found for: ${value}`)
    }

    return value
}

/**
 * Generates a normalizer from an array of rules.
 * The normalizer will return all matching
 * rules normalized value.
 *
 * @see uniNormalizer
 */
export const multiNormalizer = (rules) => (value) => {
    const result = {
        hasMatch: false,
        normalized: [],
        patterns: [],
    }

    if (!value) {
        return result
    }

    for (let rule of rules) {
        const [pattern, normalized] = rule
        if (value.match(pattern) !== null) {
            result.hasMatch = true
            result.normalized.push(normalized)
            result.patterns.push(pattern.toString())
        }
    }

    return result
}

export const globalOpinionsSubjectNormalizers = {
    // JS
    'JavaScript is moving in the right direction': 'js_moving_in_right_direction',
    'Building JavaScript apps is overly complex right now': 'building_js_apps_overly_complex',
    'JavaScript is over-used online': 'js_over_used_online',
    'I enjoy building JavaScript apps': 'enjoy_building_js_apps',
    'I would like JavaScript to be my main programming language': 'would_like_js_to_be_main_lang',
    'The JavaScript ecosystem is changing too fast': 'js_ecosystem_changing_to_fast',
    'This survey is too damn long!': 'survey_too_long',
    // CSS
    'CSS is easy to learn': 'css_easy_to_learn',
    'CSS is evolving too slowly': 'css_evolving_slowly',
    'Utility (non-semantic) classes (.center, .large-text, etc.) should be avoided':
        'utility_classes_to_be_avoided',
    'Selector nesting (.foo .bar ul li {...}) should be avoided': 'selector_nesting_to_be_avoided',
    'CSS is a programming language': 'css_is_programming_language',
    'I enjoy writing CSS': 'enjoy_writing_css',
    'What do you feel is currently missing from CSS?': 'currently_missing_from_css',
}

export const sourceNormalizationRules = [
    // twitter
    [/twii?t/i, 'twitter'],
    [/twee?t/i, 'twitter'],
    [/t\.co/i, 'twitter'],

    // email
    [/e?mail/i, 'email'],
    [/e-mail/i, 'email'],
    [/subscribed/i, 'email'],
    [/subscription/i, 'email'],
    // assuming people who did it before fall into the 'email' category
    [/(previous|last|every) (year|survey)/i, 'email'],
    [/it before/i, 'email'],

    // stateofjs
    [/state ?of ?js/i, 'stateofjs'],

    // bestofjs
    [/best ?of ?\.?js/i, 'bestofjs'],

    // js weekly
    [/javascript ?weekly/i, 'js_weekly'],
    [/js ?weekly/i, 'js_weekly'],

    // ionic newsletter
    [/ionic/i, 'ionic_newsletter'],

    // freecodecamp
    [/free ?code ?camp/i, 'freecodecamp'],
    [/fcc/i, 'freecodecamp'],

    // reddit
    [/redd?it/i, 'reddit'],
    [/r3dd1t/i, 'reddit'],
    [/\/?r\/(javascript|clojure|reactjs|angular|webdev|programming)/i, 'reddit'],
    [/\/?r\/clojure/i, 'reddit'],

    // hacker news
    [/hacker ?news/i, 'hn'],
    [/hacknews/i, 'hn'],
    [/hckrnews/i, 'hn'],
    [/hn/i, 'hn'],
    [/ycombinator/i, 'hn'],

    // medium
    [/med(iu|ui)m/i, 'medium'],

    // work
    [/work/i, 'work'],
    [/cto/i, 'work'],
    [/coworkers?/i, 'work'],
    [/co workers?/i, 'work'],
    [/co-workers?/i, 'work'],
    [/coll?ea?gu?a?es?/i, 'work'],
    [/fellow/i, 'work'],
    [/company/i, 'work'],

    // wesbos
    [/we(s|b) ?br?o(s|z)/i, 'wesbos'],
    [/wes the bos/i, 'wesbos'],
    [/^wes$/i, 'wesbos'],

    // codrops
    [/codrops/i, 'codrops'],
    [/codedrops/i, 'codrops'],
    [/tympanus/i, 'codrops'],

    // elm slack
    [/elm/i, 'elm_slack'],

    // facebook
    [/facebook/i, 'facebook'],
    [/fb/i, 'facebook'],

    [/slack/i, 'slack'],
    [/telegram/i, 'telegram'],
    [/friends?/i, 'friend'],
    [/slashdot/i, 'slashdot'],

    [/web\.dev/i, 'web_dev'],
    [/webdev/i, 'web_dev'],
    [/mcginnis/i, 'tyler_mcginnis'],
    [/twitter/i, 'twitter'],
    [/scotch/i, 'scotchio'],
    [/wieruch/i, 'robin_wieruch'],
    [/overreacted/i, 'overreacted'],
    [/abramov/i, 'overreacted'],
    [/oreilly/i, 'oreilly'],
    [/o\'reilly/i, 'overreacted'],
    [/node weekly/i, 'node_weekly'],
    [/nodeweekly/i, 'node_weekly'],
    [/hackernoon/i, 'hackernoon'],
    [/kentcdodds/i, 'kentcdodds'],
    [/dodds/i, 'kentcdodds'],
    [/juejin/i, 'juejin'],
    [/kicks/i, 'javascriptkicks'],
    [/mozilla hacks/i, 'mozilla_hacks'],
    [/mozillahacks/i, 'mozilla_hacks'],
    [/gomakethings/i, 'gomakethings'],
    [/flaviocopes/i, 'flaviocopes'],
    [/alligator/i, 'alligator'],
    [/2ality/i, '2ality'],
    [/habr/i, 'habr'],
    [/bitsofco\.de/i, 'bitsofcode'],
    [/web tools weekly/i, 'web_tools_weekly'],
    [/reading list/i, 'web_development_reading_list'],
    [/wdrl/i, 'web_development_reading_list'],
    [/web design weekly/i, 'web_design_weekly'],
    [/vue news/i, 'vue_news'],
    [/vue\.js newsletter/i, 'vue_news'],
    [/vue\.js weekly/i, 'vue_news'],
    [/vue revue/i, 'vue_revue'],
    [/ember times/i, 'ember_times'],
    [/ember ?times/i, 'ember_times'],
    [/ember ?weekly/i, 'ember_weekly'],
    [/elm ?weekly/i, 'elm_weekly'],
    [/angular ?weekly/i, 'angular_weekly'],
    [/syntax/i, 'syntaxfm'],
    [/rascia/i, 'tania_rascia'],
    [/sidebar/i, 'sidebar'],
    [/react ?status/i, 'react_status'],
    [/ponyfoo/i, 'ponyfoo'],
    [/frontend focus/i, 'frontend_focus'],
    [/frontendfocus/i, 'frontend_focus'],
    [/egghead/i, 'eggheadio'],
    [/esnext/i, 'esnext'],
    [/es\.next/i, 'esnext'],
    [/codyhouse/i, 'codyhouse'],
    [/codepen/i, 'codepen'],
    [/changelog/i, 'changelog'],
    [/css( |-|_)?weekly/i, 'css_weekly'],
    [/angular ?in ?depth/i, 'angular_in_depth'],

    [/web\-standards/i, 'web_standards_ru'],
    [/web ?standards/i, 'web_standards_ru'],
    [/web ?standarts/i, 'web_standards_ru'],
    [/undefined/i, 'undefined_podcast'],
    [/toolsday/i, 'toolsday'],
    [/software ?engineering ?daily/i, 'software_engineering_daily'],
    [/react ?podcast/i, 'react_podcast'],
    [/putaindecode/i, 'putaindecode'],
    [/ladybug/i, 'ladybug'],
    [/if\/else/i, 'if_else_podcast'],
    [/fun ?fun ?function/i, 'fun_fun_function'],
    [/elm ?town/i, 'elmtown'],
    [/devmode/i, 'devmode'],
    [/dev ?schacht/i, 'dev_schacht'],
    [/corecursive/i, 'corecursive'],
    [/coding ?blocks/i, 'coding_blocks'],
    [/working ?draft/i, 'working_draft'],
    [/webbidevaus/i, 'webbidevaus'],
    [/views ?on ?vue/i, 'views_on_vue'],
    [/bikeshed/i, 'bikeshed'],
    [/react ?podcast/i, 'react_podcast'],
    [/talkscript/i, 'talkscript'],
    [/soft ?skills ?engineering/i, 'soft_skills_engineering'],
    [/reason ?town/i, 'reason_town'],
    [/real ?talk/i, 'real_talk_javascript'],
    [/react ?native ?radio/i, 'react_native_radio'],
    [/hipsters/i, 'hipsters_tech'],
    [/http203/i, 'http203'],
    [/functional ?geekery/i, 'functional_geekery'],
    [/frontend ?weekend/i, 'frontend_weekend'],
    [/frontend ?weekend/i, 'frontend_weekend'],
    [/happy ?hour/i, 'frontend_happyhour'],
    [/embermap/i, 'embermap'],
    [/developer ?tea/i, 'developer_tea'],
    [/command ?line ?heroes/i, 'command_line_heroes'],
    [/command ?line ?heroes/i, 'command_line_heroes'],
    [/base ?cs/i, 'base_cs'],
    [/angular ?air/i, 'angular_air'],
    [/adventures ?in ?angular/i, 'adventures_in_angular'],
    [/net ?rocks/i, 'dot_net_rocks'],

    [/schwarzmuller/i, 'schwarzmuller'],
    [/schwarzmüller/i, 'schwarzmuller'],
    [/shwarzmüller/i, 'schwarzmuller'],

    [/youtube/i, 'youtube'],
    [/vue ?school/i, 'vueschool'],
    [/laracasts/i, 'laracasts'],
    [/vue ?mastery/i, 'vuemastery'],
    [/ultimate ?course/i, 'ultimate_courses'],
    [/udemy/i, 'udemy'],
    [/platzi/i, 'platzi'],
    [/udacity/i, 'udacity'],
    [/treehouse/i, 'treehouse'],
    [/testingjavascript/i, 'testingjavascript'],
    [/scrimba/i, 'scrimba'],
    [/packtpub/i, 'packtpub'],
    [/javascript\.info/i, 'javascript_info'],
    [/front ?end ?masters/i, 'frontendmasters'],
    [/exercism/i, 'exercism'],
    [/devdocs/i, 'devdocs'],
    [/codewars/i, 'codewars'],
    [/caniuse/i, 'caniuse'],
    [/lynda/i, 'lynda'],
    [/traversy/i, 'traversy'],
    [/odin/i, 'odin_project'],
    [/open ?class ?room/i, 'openclassroom'],
    [/linkedin ?learning/i, 'linkedin_learning'],
    [/fireship/i, 'fireship'],
    [/academind/i, 'academind'],
    [/css( |-|_)?tricks/i, 'css_tricks'],

    [/newsletter/i, 'newsletter'],

    // post
    [/post/i, 'post'],
    [/blog/i, 'post'],
    [/article/i, 'post'],
]

// test if a value corresponds to a valid normalisation value
export const isValidNormalization = (value, rules) =>
    rules.some((ruleArray) => {
        const [reg, rule] = ruleArray
        return value === rule
    })

export const normalizeSource = uniNormalizer(sourceNormalizationRules)

export const normalizeResponseSource = (response) => {
    const [normalizedFindOut, findOutPattern] = normalizeSource(
        response.how_did_user_find_out_about_the_survey
    )
    const [normalizedReferrer, referrerPattern] = normalizeSource(response.referrer)
    if (response.source) {
        // if response has explicitly passed source, use that
        return response.source
    } else if (isValidNormalization(normalizedFindOut, sourceNormalizationRules)) {
        // else if freeform "how did you hear…" can be normalized, use that
        return [normalizedFindOut, findOutPattern]
    } else if (isValidNormalization(normalizedReferrer, sourceNormalizationRules)) {
        // else try to normalize referrer
        return [normalizedReferrer, referrerPattern]
    } else {
        // else leave field empty
        return []
    }
}

/**
 * Defines a set of rules which can be applied
 * in order to standardize tool names, it's mostly involved
 * to extract things from the "other tools" questions.
 *
 * ⚠️ ORDER MATTERS
 */
const toolNormalizationRules = [
    [/(Good Old Plain JavaScript|"Plain" JavaScript \(ES5\)|vanilla)/i, 'vanillajs'],
    [/es6/i, 'es6'],
    [/coffescript/i, 'coffeescript'],
    [/coffeescript/i, 'coffeescript'],
    [/typescript/i, 'typescript'],
    [/flow/i, 'flow'],
    [/elm-test/i, 'elm_test'],
    [/elm( |-)?native/i, 'elm_native'],
    [/elm/i, 'elm'],
    [/reason/i, 'reason'],
    [/clojure/i, 'clojurescript'],
    [/No Front-End Framework/i, 'nofrontendframework'],
    [/preact/i, 'preact'],
    [/^react$/i, 'react'],
    [/aurelia/i, 'aurelia'],
    [/polymer/i, 'polymer'],
    [/^angular$/i, 'angular'],
    [/angular ?2/i, 'angular'],
    [/angular ?1/i, 'angular_1'],
    [/angular( |-)?native/i, 'angular_native'],
    [/ember/i, 'ember'],
    [/ember( |-|\.)?data/i, 'ember_data'],
    [/^vue(\.js)?$/i, 'vuejs'],
    [/backbone/i, 'backbone'],
    [/redux/i, 'redux'],
    [/mobx/i, 'mobx'],
    [/rest( |-)?api/i, 'rest'],
    [/restify/i, 'restify'],
    [/firebase/i, 'firebase'],
    [/graphql/i, 'graphql'],
    [/apollo/i, 'apollo'],
    [/falcor/i, 'falcor'],
    [/horizon/i, 'horizon'],
    [/(meteor|blaze)/i, 'meteor'],
    [/feathers/i, 'feathers'],
    [/donejs/i, 'donejs'],
    [/mern/i, 'mern'],
    [/mean/i, 'mean'],
    [/mocha/i, 'mocha'],
    [/jasmine/i, 'jasmine'],
    [/enzyme/i, 'enzyme'],
    [/jest/i, 'jest'],
    [/cucumber/i, 'cucumberjs'],
    [/^ava$/i, 'ava'],
    [/^java$/i, 'java'],
    [/tape/i, 'tape'],
    [/karma/i, 'karma'],
    [/plain( |-|\.)css/i, 'plaincss'],
    [/css( |-|_|\.)?modules/i, 'css_modules'],
    [/css( |-|_|\.)?next/i, 'cssnext'],
    [/pure( |-|_|\.)?css/i, 'pure_css'],
    [/post( |-|_|\.)?css/i, 'post_css'],
    [/css( |-|_)?in( |-|_)?js/i, 'css_in_js'],
    [/s(a|c)ss/i, 'sass'],
    [/^less$/i, 'less'],
    [/stylus/i, 'stylus'],
    [/aphrodite/i, 'aphrodite'],
    [/webpack/i, 'webpack'],
    [/grunt/i, 'grunt'],
    [/gulp/i, 'gulp'],
    [/browserify/i, 'browserify'],
    [/bower/i, 'bower'],
    [/native( |-|_)?apps/i, 'nativeapps'],
    [/react( |-|_)?native/i, 'reactnative'],
    [/phonegap\/cordova/i, 'cordova'],
    [/cordova/i, 'cordova'],
    [/phonegap/i, 'phonegap'],
    [/native( |-|_)?script/i, 'nativescript'],
    [/express/i, 'express'],
    [/koa/i, 'koa'],
    [/hapi/i, 'hapi'],
    [/relay/i, 'relay'],
    [/sails/i, 'sails'],
    [/loopback/i, 'loopback'],
    [/keystone/i, 'keystone'],
    [/electron/i, 'electron'],
    [/ionic/i, 'ionic'],
    [/bootstrap/i, 'bootstrap'],
    [/foundation/i, 'foundation'],
    [/npm/i, 'npm'],
    [/rollup/i, 'rollup'],
    [/next(\.| |-|_)?js/i, 'nextjs'],
    [/storybook/i, 'storybook'],
    [/cycle( |-|_|\.)js/i, 'cyclejs'],
    [/knockout/i, 'knockout'],
    [/jquery/i, 'jquery'],
    [/mithril/i, 'mithril'],
    [/inferno/i, 'inferno'],
    [/riot/i, 'riotjs'],
    [/^ext\.?(js)?$/i, 'extjs'],
    [/svelte/i, 'svelte'],
    [/^om$/i, 'om'],
    [/choo/i, 'choo'],
    [/hyperapp/i, 'hyperapp'],
    [/dojo/i, 'dojo'],
    [/alkali/i, 'alkali'],
    [/marionette/i, 'marionette'],
    [/kendo/i, 'kendo'],
    [/marko/i, 'marko'],
    [/reagent/i, 'reagent'],
    [/haxe/i, 'haxe'],
    [/ampersand/i, 'ampersand'],
    [/rxjs/i, 'rxjs'],
    [/canjs/i, 'canjs'],
    [/prototype/i, 'prototype'],
    [/mootools/i, 'mootools'],
    [/glimmer/i, 'glimmerjs'],
    [/durandal/i, 'durandal'],
    [/moon/i, 'moon'],
    [/batman/i, 'batman'],
    [/flight/i, 'flight'],
    [/scala/i, 'scala'],
    [/webix/i, 'webix'],
    [/enyo/i, 'enyo'],
    [/quasar/i, 'quasar'],
    [/d3/i, 'd3'],
    [/three/i, 'threejs'],
    [/cerebral/i, 'cerebral'],
    [/underscore/i, 'underscore'],
    [/vuex/i, 'vuex'],
    [/flux/i, 'flux'],
    [/pouch/i, 'pouchdb'],
    [/ngrx/i, 'ngrx'],
    [/graph\.?cool/i, 'graphcool'],
    [/parse/i, 'parse'],
    [/realm/i, 'realm'],
    [/gun/i, 'gunjs'],
    [/couchbase/i, 'couchbase'],
    [/datomic/i, 'datomic'],
    [/deployd/i, 'deployd'],
    [/hood\.?ie/i, 'hoodie'],
    [/kinvey/i, 'kinvey'],
    [/kinto/i, 'kinto'],
    [/mongo/i, 'mongodb'],
    [/contentful/i, 'contentful'],
    [/mysql/i, 'mysql'],
    [/redis/i, 'redis'],
    [/rethink/i, 'rethinkdb'],
    [/^node$|node\.?js|node js/i, 'nodejs'],
    [/asp\. ?net|\.net|dotnet/i, 'dotnet'],
    [/c#/i, 'C#'],
    [/django/i, 'django'],
    [/ror|rails|ruby on rails/i, 'rails'],
    [/phpstorm/i, 'phpstorm'],
    [/php/i, 'php'],
    [/adonis/i, 'adonis'],
    [/python/i, 'python'],
    [/^go$|golang/i, 'golang'],
    [/laravel/i, 'laravel'],
    [/elixir/i, 'elixir'],
    [/couchdb/i, 'couchdb'],
    [/trails/i, 'trails'],
    [/kraken/i, 'kraken'],
    [/serverless/i, 'serverless'],
    [/socket\.?io/i, 'socketio'],
    [/micro/i, 'micro'],
    [/haskell/i, 'haskell'],
    [/qunit/i, 'qunit'],
    [/chai/i, 'chai'],
    [/protractor/i, 'protractor'],
    [/selenium/i, 'selenium'],
    [/nightwatch/i, 'nightwatch'],
    [/^tap$/i, 'node_tap'],
    [/sinon/i, 'sinonjs'],
    [/^intern$/i, 'intern'],
    [/^lab$/i, 'lab'],
    [/testcafe/i, 'testcafe'],
    [/junit/i, 'junit'],
    [/cypress/i, 'cypress'],
    [/phantom/i, 'phantomjs'],
    [/^atomic ?css/i, 'atomic_css'],
    [/^oocss/i, 'oocss'],
    [/^smacss/i, 'smacss'],
    [/^it ?css/i, 'it_css'],
    [/bem/i, 'bem'],
    [/bulma/i, 'bulma'],
    [/semantic/i, 'semantic_ui'],
    [/tachyons|tach\.+on/i, 'tachyons'],
    [/material design/i, 'material_design'],
    [/skeleton/i, 'skeleton'],
    [/material(\.| |-|_)?ui/i, 'material_ui'],
    [/styled(\.| |-|_)?components/i, 'styled_components'],
    [/styled(\.| |-|_)?jsx/i, 'styled_jsx'],
    [/bourbon/i, 'bourbon'],
    [/mill?igram/i, 'milligram'],
    [/uikit/i, 'ui_kit'],
    [/flexbox/i, 'flexbox'],
    [/topocoat/i, 'topocoat'],
    [/glamor/i, 'glamor'],
    [/radium/i, 'radium'],
    [/styletron/i, 'styletron'],
    [/jss/i, 'jss'],
    [/mdl/i, 'mdl'],
    [/vuetify/i, 'vuetify'],
    [/materiali(z|s)e/i, 'materialize_css'],
    [/brunch/i, 'brunch'],
    [/make/i, 'make'],
    [/broccoli|brocolli/i, 'broccoli'],
    [/fusebox/i, 'fusebox'],
    [/systemjs/i, 'systemjs'],
    [/gradle/i, 'gradle'],
    [/stealjs/i, 'stealjs'],
    [/babel/i, 'babel'],
    [/weex/i, 'weex'],
    [/xamarin/i, 'xamarin'],
    [/pwa/i, 'pwa'],
    [/progressive( |-|_)?web( |-|_)?app/i, 'pwa'],
    [/^nw(js)$/i, 'nwjs'],
    [/expo/i, 'expo'],
    [/flutter/i, 'flutter'],
    [/(appcelerator|titanium)/i, 'appcelerator'],
    [/fuse/i, 'fuse'],
    [/^cef$/i, 'cef'],
    [/chromium embedded framework/i, 'cef'],
    [/swift/i, 'swift'],
    [/yarn/i, 'yarn'],
    [/nuget/i, 'nuget'],
    [/composer/i, 'composer'],
    [/jspm/i, 'jspm'],
    [/pnpm/i, 'pnpm'],
    [/homebrew|brew/i, 'homebrew'],
    [/leiningen/i, 'leiningen'],
    [/maven/i, 'maven'],
    [/immutable/i, 'immutable'],
    [/lodash/i, 'lodash'],
    [/moment/i, 'moment'],
    [/ramda/i, 'ramda'],
    [/axios/i, 'axios'],
    [/recompose/i, 'recompose'],
    [/zepto/i, 'zepto'],
    [/async/i, 'async'],
    [/atom/i, 'atom'],
    [/webstorm/i, 'webstorm'],
    [/intellij/i, 'intellij'],
    [/sublime/i, 'sublime_text'],
    [/vim/i, 'vim'],
    [/emacs/i, 'emacs'],
    [/brackets/i, 'brackets'],
    [/(visual studio|vs code|vscode|visualstudio)/i, 'visual_studio'],
    [/notepad/i, 'notepad++'],
    [/netbeans/i, 'netbeans'],
    [/coda/i, 'coda'],
    [/prettier/i, 'prettier'],
    [/eslint/i, 'eslint'],
    [/tslint/i, 'tslint'],
    [/stylelint/i, 'stylelint'],
    [/jshint/i, 'jshint'],
    [/standardjs/i, 'standardjs'],
    [/jscs/i, 'jscs'],
    [/jslint/i, 'jslint'],
    [/^xo$/i, 'xo'],
    [/date(-|_)?fns/i, 'date_fns'],
    [/objective(-|_)?c/i, 'objective_c'],
    [/parcel/i, 'parcel'],
    [/rust/i, 'rust'],
    [/service(-|_)?workers/i, 'service_workers'],
    [/ocaml/i, 'ocaml'],
    [/nano/i, 'nano'],
    [/kotlin/i, 'kotlin'],
    [/^r$/i, 'r'],
    [/pycharm/i, 'pycharm'],
    [/erlang/i, 'erlang'],
    [/bash/i, 'bash'],
    [/delphi/i, 'delphi'],
    [/perl/i, 'perl'],
    [/lisp/i, 'lisp'],
    [/purescript/i, 'purescript'],
    [/websockets/i, 'websockets'],
    [/luxon/i, 'luxon'],
    [/fbelt/i, 'fbelt'],
    [/bbedit/i, 'bbedit'],
    [/dart/i, 'dart'],
    [/lua/i, 'lua'],
    [/webgl/i, 'webgl'],
    [/webrtc/i, 'webrtc'],
    [/webvr/i, 'webvr'],
    [/web( )?audio( )?api/i, 'web_audio_api'],
    [/web( )?speech( )?api/i, 'web_speech_api'],
    [/web( )?components/i, 'web_components'],
    [/web( )?animation(s)?( )?api/i, 'web_animations_api'],
    [/web( )?assembly/i, 'web_assembly'],
    [/service( )?workers/i, 'service_workers'],
    [/C\/C\+\+/i, 'c-cplusplus'],
    [/ruby/i, 'ruby'],
    [/LitElement/i, 'litelement'],

    [/nest/i, 'nest'],
    [/hapi/i, 'hapi'],
    [/gridsome/i, 'gridsome'],
    [/sapper/i, 'sapper'],
    [/vulcan/i, 'vulcan'],
    [/prisma/i, 'prisma'],
    [/flask/i, 'flask'],
    [/inertia/i, 'inertia'],
    [/egg/i, 'egg'],
    [/strapi/i, 'strapi'],
    [/socket\.io/i, 'socketio'],
    [/socketio/i, 'socketio'],
    [/fastify/i, 'fastify'],
    [/restify/i, 'restify'],
    [/symfony/i, 'symfony'],

    [/stimulus/i, 'stimulus'],
    [/stencil/i, 'stencil'],
    [/re\-frame/i, 'reframe'],
    [/reframe/i, 'reframe'],
    [/lit-html/i, 'litelement'],
    [/lit-element/i, 'litelement'],
    [/hyperhtml/i, 'hyperhtml'],
    [/cycle/i, 'cycle'],
    [/sencha/i, 'sencha'],
    [/ractive/i, 'ractive'],
    [/nuxt/i, 'nuxt'],
    [/gatsby/i, 'gatsby'],
    [/blazor/i, 'blazor'],
    [/angularjs/i, 'angularjs'],

    [/xstate/i, 'xstate'],
    [/urql/i, 'urql'],
    [/unistore/i, 'unistore'],
    [/unistroe/i, 'unistore'],
    [/storeon/i, 'storeon'],
    [/stator/i, 'stator'],
    [/orbit/i, 'orbit'],
    [/immer/i, 'immer'],
    [/hasura/i, 'hasura'],
    [/easy\-peasy/i, 'easypeasy'],
    [/easypeasy/i, 'easypeasy'],
    [/unstated/i, 'unstated'],
    [/swr/i, 'swr'],
    [/rematch/i, 'rematch'],
    [/context/i, 'react_context'],
    [/hooks/i, 'react_hooks'],
    [/overmind/i, 'overmind'],
    [/ngxs/i, 'ngxs'],
    [/effector/i, 'effector'],
    [/akita/i, 'akita'],
    [/tailwind/i, 'tailwind_css'],
    [/primer/i, 'primer'],

    [/webdriver/i, 'webdriver'],
    [/wallaby/i, 'wallaby'],
    [/vue\-test\-utils/i, 'vue_test_utils'],
    [/testing\-library/i, 'react_testing_library'],
    [/styleguidist/i, 'styleguidist'],
    [/stryker/i, 'stryker'],
    [/spectator/i, 'spectator'],
    [/stryker/i, 'stryker'],
    [/percy/i, 'percy'],
    [/detox/i, 'detox'],
    [/codecept/i, 'codecept'],

    [/capacitor/i, 'capacitor'],
    [/vue native/i, 'vue_native'],
    [/revery/i, 'revery'],
    [/nodegui/i, 'nodegui'],
    [/node gui/i, 'nodegui'],
    [/framework7/i, 'framework7'],

    [/vivaldi/i, 'vivaldi'],
    [/qute/i, 'qutebrowser'],
    [/opera/i, 'opera'],
    [/brave/i, 'brave'],
    [/sizzy/i, 'sizzy'],
    [/internet explorer 11/i, 'ie11'],
    [/ie11/i, 'ie11'],
    [/ie 11/i, 'ie11'],
    [/firefox developer edition/i, 'firefox_developer_edition'],
    [/edge chromium/i, 'edge_chromium'],
    [/edge \(chromium\)/i, 'edge_chromium'],
    [/chromium/i, 'chromium'],

    [/tsc/i, 'tsc'],
    [/shadow/i, 'shadow_cljs'],
    [/pika/i, 'pika'],
    [/lerna/i, 'lerna'],
    [/create-react-app/i, 'create_react_app'],
    [/cra/i, 'create_react_app'],
    [/angular-cli/i, 'angular_cli'],
    [/angular cli/i, 'angular_cli'],
    [/vue-cli/i, 'vue_cli'],
    [/vue cli/i, 'vue_cli'],
    [/metro/i, 'metro'],
    [/bazel/i, 'bazel'],
    [/codekit/i, 'codekit'],

    [/kakoune/i, 'kakoune'],
    [/geany/i, 'geany'],
    [/codesandbox/i, 'codesandbox'],
    [/xcode/i, 'xcode'],
    [/textmate/i, 'textmate'],
    [/eclipse/i, 'eclipse'],

    [/voca/i, 'voca'],
    [/uuid/i, 'uuid'],
    [/spacetime/i, 'spacetime'],
    [/reselect/i, 'reselect'],
    [/numeral/i, 'numeral'],
    [/math/i, 'mathjs'],
    [/joda/i, 'js_joda'],
    [/i18next/i, 'i18next'],
    [/gsap/i, 'gsap'],
    [/fp-ts/i, 'fp_ts'],
    [/formik/i, 'formik'],
    [/dotenv/i, 'dotenv'],
    [/day\.js/i, 'dayjs'],
    [/dayjs/i, 'dayjs'],
    [/classnames/i, 'classnames'],
    [/bluebird/i, 'bluebird'],
    [/sanctuary/i, 'sanctuary'],
    [/rambda/i, 'ramda'],
    [/nodemon/i, 'nodemon'],
    [/greensock/i, 'gsap'],
    [/emotion/i, 'emotion'],
    [/sanctuary/i, 'sanctuary'],
    [/sanctuary/i, 'sanctuary'],

    [/sql/i, 'sql'],
    [/shell/i, 'shell'],
    [/solidity/i, 'solidity'],
    [/matlab/i, 'matlab'],
    [/html/i, 'html'],
    [/css/i, 'css'],
    [/groovy/i, 'groovy'],
    [/f\#/i, 'fsharp'],
    [/crystal/i, 'crystal'],
    [/coldfusion/i, 'coldfusion'],
    [/cfml/i, 'coldfusion'],
    [/apex/i, 'apex'],

    [/ant(\.| |-|_)?design/i, 'ant_design'],

    [/^edge$/i, 'edge'],
    [/^chrome$/i, 'chrome'],
    [/^safari$/i, 'safari'],
    [/^firefox$/i, 'firefox'],
]

export const normalizeTool = uniNormalizer(toolNormalizationRules)
export const normalizeOtherTools = multiNormalizer(toolNormalizationRules)
export const normalizeResources = multiNormalizer(sourceNormalizationRules)

const ignoreValues = [
    ' ',
    '\n',
    '\n\n',
    '/',
    '\\',
    '*',
    '+',
    '-',
    '—',
    'n/a',
    'N/A',
    'NA',
    'None',
    'none',
    'no',
    'No',
    '.',
    '?',
]

export const cleanupValue = (value) => (ignoreValues.includes(value) ? null : value)

export const featuresMapping = {
    grid: 'CSS Grid',
    flexbox: 'Flexbox',
    multi_column: 'CSS Multi-Column',
    writing_modes: 'CSS Writing Modes',
    exclusions: 'CSS Exclusions',
    shapes: 'CSS Shapes',
    object_fit: 'Object-fit',
    clip_path: 'Clip-path',
    masks: 'CSS Masks',
    blend_modes: 'Blend Modes',
    filter_effects: 'CSS Filter Effects',
    scroll_snap: 'CSS Scroll Snap',
    overscroll_behavior: 'Overscroll-behavior',
    overflow_anchor: 'Overflow-anchor',
    web_fonts: 'Web fonts (@font-face)',
    variables_fonts: 'Variable fonts',
    line_breaking: 'Line breaking properties (overflow-wrap, word-break, line-break, hyphens)',
    font_variant: 'Font-variant-\\*',
    initial_letter: 'Initial-letter',
    transitions: 'CSS Transitions',
    transforms: 'CSS Transforms',
    animations: 'CSS Animations',
    variables: 'CSS Variables',
    feature_support_queries: 'Feature Support Queries (@supports)',
    containment: 'CSS Containment',
    will_change: 'Will-change',
    calc: 'calc()',
    units: 'Units',
    pseudo_elements: 'Pseudo Elements',
    combinators: 'Combinators',
    tree_document_structure: 'Tree / Document Structure',
    attributes: 'Attributes',
    links_urls: 'Links/URLs',
    interaction: 'Interaction',
    form_controls: 'Form controls',
    // units
    px: 'px',
    pt: 'pt',
    percent: '%',
    em: 'em',
    rem: 'rem',
    vh_vw: 'vh, vw',
    vmin_vmax: 'vmin, vmax',
    ch: 'ch',
    ex: 'ex',
    mm: 'mm',
    cm: 'cm',
    in: 'in',
    // pseudo elements
    before: '::before',
    after: '::after',
    first_line: '::first-line',
    first_letter: '::first-letter',
    selection: '::selection',
    placeholder: '::placeholder',
    // combinators
    descendant: 'div span (descendant)',
    child: 'div > span (child)',
    next_sibling: 'div + div (next sibling)',
    subsequent_sibling: 'div ~ div (subsequent sibling)',
    // tree document structure
    root: ':root',
    empty: ':empty',
    not: ':not()',
    nth_child: ':nth-child()',
    nth_last_child: ':nth-last-child()',
    first_child: ':first-child',
    last_child: ':last-child',
    only_child: ':only-child',
    nth_of_type: ':nth-of-type()',
    nth_last_of_type: ':nth-last-of-type()',
    first_of_type: ':first-of-type',
    last_of_type: ':last-of-type',
    only_of_type: ':only-of-type',
    lang: ':lang()',
    // attributes
    presence: 'div[foo] (Presence)',
    equality: 'div[foo="bar"] (Equality)',
    starts_with: 'div[foo^="bar"] (Starts with)',
    ends_with: 'div[foo$="bar"] (Ends with)',
    contains_word: 'div[foo~="bar"] (Contains word)',
    contains_substring: 'div[foo*="bar"] (Contains substring)',
    // links urls
    any_link: ':any-link',
    link_visited: ':link and :visited',
    local_link: ':local-link',
    target: ':target',
    // interaction
    hover: ':hover',
    active: ':active',
    focus: ':focus',
    focus_within: ':focus-within',
    focus_visible: ':focus-visible',
    // form controls
    enabled_disabled: ':enabled and :disabled',
    read_only_write: ':read-only and :read-write',
    placeholder_shown: ':placeholder-shown',
    default: ':default',
    checked: ':checked',
    indeterminate: ':indeterminate',
    valid_invalid: ':valid and :invalid',
    user_invalid: ':user-invalid',
    in_out_range: ':in-range and :out-of-range',
    required_optional: ':required and :optional',
}

export const normalizeFeatureId = (featureTitle) => {
    const mapping = Object.entries(featuresMapping)
    const feature = mapping.find(([id, title]) => title === featureTitle)

    if (feature === undefined) {
        console.warn(`no mapping found for feature: ${featureTitle}`)
        return featureTitle
    }

    return feature[0]
}

export const environmentMapping = {
    browsers: 'Browsers',
    form_factors: 'Form Factors',
    css_for_print: 'CSS for Print',
    css_for_email: 'CSS for Email Clients',
}

export const normalizeEnvironmentId = (environmentTitle) => {
    const mapping = Object.entries(environmentMapping)
    const environment = mapping.find(([id, title]) => title === environmentTitle)

    if (environment === undefined) {
        console.warn(`no mapping found for environment: ${environmentTitle}`)
        return environmentTitle
    }

    return environment[0]
}

export const normalizeResourceId = (resourceTitle) => {
    if (resourceTitle.includes('Blogs') && resourceTitle.includes('Magazines')) {
        return resources.BLOGS_NEWS_MAGAZINES
    }
    if (resourceTitle.includes('Podcasts')) {
        return resources.PODCASTS
    }
    if (resourceTitle.includes('Sites') && resourceTitle.includes('Courses')) {
        return resources.SITES_COURSES
    }

    throw new Error(`Unable to normalize resource ID for title: ${resourceTitle}`)
}

/**
 * Defines a set of rules which can be applied
 * in order to standardize environment names, it's mostly involved
 * to extract things from the "environment" choices based questions.
 *
 * ⚠️ ORDER MATTERS
 */
const environmentNormalizationRules = [
    // browsers
    [/edge/i, 'edge'],
    [/chrome android/i, 'chrome_android'],
    [/chrome ios/i, 'chrome_ios'],
    [/chrome/i, 'chrome'],
    [/chromium/i, 'chromium'],
    [/safari ios/i, 'safari_ios'],
    [/safari/i, 'safari'],
    [/firefox android/i, 'firefox_android'],
    [/firefox ios/i, 'firefox_ios'],
    [/firefox/i, 'firefox'],
    [/internet explorer 11/i, 'internet_explorer_11'],
    [/internet explorer 8\/9\/10/i, 'internet_explorer_8_9_10'],
    [/opera mini/i, 'opera_mini'],
    [/opera android/i, 'opera_android'],
    [/opera/i, 'opera'],
    [/vivaldi/i, 'vivaldi'],
    [/brave/i, 'brave'],
    [/samsung internet/i, 'samsung_internet'],
    [/android browser/i, 'android_browser'],
    [/uc browser/i, 'ucbrowser'],
    [/lynx/i, 'lynx'],
    [/kiosk/i, 'kiosk'],
    [/yandex/i, 'yandex'],
    [/epiphany/i, 'epiphany'],
    [/polypane/i, 'polypane'],
    // form factors
    [/desktop/i, 'desktop'],
    [/smartphone/i, 'smartphone'],
    [/feature phone/i, 'feature_phone'],
    [/tablet/i, 'tablet'],
    [/print/i, 'print'],
    [/screen reader/i, 'screen_reader'],
    [/gaming console/i, 'gaming_console'],
    [/smart watch/i, 'smart_watch'],
    [/apple watch/i, 'apple_watch'],
    [/laptop/i, 'laptop'],
    [/vr/i, 'ar_vr_devices'],
    [/AR/, 'ar_vr_devices'],
    [/tv/i, 'tv'],
]

export const normalizeEnvironment = uniNormalizer(environmentNormalizationRules, true)
export const normalizeEnvironments = multiNormalizer(environmentNormalizationRules)

export const proficiencyMapping = {
    javascript_proficiency: 'JavaScript Proficiency',
    backend_proficiency: 'Back-end Proficiency',
}

export const normalizeProficiencyId = (proficiencyTitle) => {
    const mapping = Object.entries(proficiencyMapping)
    const proficiency = mapping.find(([id, title]) => title === proficiencyTitle)

    if (proficiency === undefined) {
        console.warn(`no mapping found for proficiency: ${proficiencyTitle}`)
        return proficiencyTitle
    }

    return proficiency[0]
}

export const jobTitleMapping = {
    front_end_developer: 'Front-end Developer/Engineer',
    full_stack_developer: 'Full-stack Developer/Engineer',
    back_end_developer: 'Back-end Developer/Engineer',
    web_designer: 'Web Designer',
    ui_designer: 'UI Designer',
    ux_designer: 'UX Designer',
}

export const normalizeJobTitle = (jobTitleLabel) => {
    const mapping = Object.entries(jobTitleMapping)
    const jobTitle = mapping.find(([id, label]) => label === jobTitleLabel)

    if (jobTitle === undefined) {
        console.warn(`no job title found for label: ${jobTitleLabel}`)
        return jobTitleLabel
    }

    return jobTitle[0]
}

export const predefinedResourceMapping = {
    css_tricks: 'CSS Tricks',
    smashing_magazine: 'Smashing Magazine',
    codrops: 'CoDrops',
    sitepoint: 'SitePoint',
    david_walsh: 'David Walsh',
    dev_to: 'Dev.to',
    sidebar: 'Sidebar',
    heydesigner: 'HeyDesigner',
    css_weekly: 'CSS Weekly',
    frontend_horse: 'Frontend Horse',
    a_list_apart: 'A List Apart',
    css_specs: 'The CSS Specs',

    stack_overflow: 'Stack Overflow',
    mdn: 'MDN',
    w3schools: 'W3Schools',
    freecodecamp: 'FreeCodeCamp',
    codecademy: 'Codecademy',
    levelup_tutorials: 'LevelUp Tutorials',
    wes_bos_courses: 'Wes Bos Courses (GSSGrid.io, Flexbox.io, etc.)',
    pluralsight: 'Pluralsight',
    designcode: 'DesignCode',

    shop_talk_show: 'Shop Talk Show',
    style_guide_podcast: 'Style Guide Podcast',
    the_big_web_show: 'The Big Web Show',
    the_web_ahead: 'The Web Ahead',
    non_breaking_space_show: 'Non Breaking Space Show',
    the_changelog: 'The Changelog',
    syntax: 'Syntax',
    css_podcast: 'CSS Podcast',
}

export const normalizeResource = (resourceLabel) => {
    const mapping = Object.entries(predefinedResourceMapping)

    const resource = mapping.find(([id, label]) => label === resourceLabel)
    if (resource === undefined) {
        throw new Error(`no resource found for label: ${resourceLabel}`)
    }

    return resource[0]
}

const otherOpinionNormalizationRules = [
    // missing CSS features
    [/container( |-)(media|width)? ?quer(y|ies)/i, 'container_queries'],
    [/(element|object|component)s? (based )?(media )?quer(y|ies)/i, 'container_queries'],
    [/parent select(or|ion)/i, 'parent_selector'],
    [/parent (of )?(an )?element/i, 'parent_selector'],
    [/\:parent/i, 'parent_selector'],
    [/(target|select|style) (a )?parent/i, 'parent_selector'],
    [/nesting/i, 'nesting'],
    [/nested select(or|ion)/i, 'nesting'],
    [/sub( |-)?grid/i, 'subgrid'],
    [/\:has/i, 'has_selector'],
    [/has\(\)/i, 'has_selector'],
    [/mixins?/i, 'mixins'],
    [/functions?/i, 'functions'],
    [/houdini/i, 'houdini'],
    [/encapsulation/i, 'scoping'],
    [/isolation/i, 'scoping'],
    [/scop(e|ing)/i, 'scoping'],
    [/nothing/i, 'nothing'],
    [/browser support/i, 'browser_support'],
    [/browser adoption/i, 'browser_support'],
    [/consistency/i, 'browser_support'],
    [/consistent support/i, 'browser_support'],
    [/cross( |-)browser/i, 'browser_support'],
    [/conditional/i, 'conditional_logic'],
    [/if statement/i, 'conditional_logic'],
    [/simplicity/i, 'simplicity'],
    [/sass/i, 'sass'],
]

export const normalizeOtherOpinion = multiNormalizer(otherOpinionNormalizationRules)
