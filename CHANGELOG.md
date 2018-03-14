# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.4.0"></a>
# [1.4.0](https://github.com/vire/jest-vue-preprocessor/compare/v1.3.1...v1.4.0) (2018-03-14)


* Support for Functional Components (#50) ([c0c0590](https://github.com/vire/jest-vue-preprocessor/commit/c0c0590)), closes [#50](https://github.com/vire/jest-vue-preprocessor/issues/50)


### Features

* **deps:** Bump dependency versions ([#59](https://github.com/vire/jest-vue-preprocessor/issues/59)) ([0b86495](https://github.com/vire/jest-vue-preprocessor/commit/0b86495))


### BREAKING CHANGES

* none, but in the future $el should be
defined, as it can't be used for testing if it's
undefined

* fix(test): behaves differently locally

test behaves differently on travis-ci than
on my local machine, so now there is a test
to document that
* none

* fix(test): typeof didn't work

tried to use typeof, decided to use
casting

no breaking changes

* fix(testing): removed context

context is needed for mounting functional components
but not as an option for a render function

no breaking changes

* fix(testing): iie -> function

was passing an expression not a function
to onClick handler

no breaking changes

* fix(testing): properly call props.onClick

1. need to pass props in context object to Vue.compile
2. need '@click="props.onClick('stuff')" VS
	'@click="() => props.onClick('stuff')"

No breaking changes

* test(local): can't reproduce locally

can't reproduce $el.querySelector being defined
locally, yet on travis-ci it's defined.
Without it being defined I can't debugger and
figure out what the mock function isn't being called.
* none; objeys all test criteria
except for testing that mockFn was called
