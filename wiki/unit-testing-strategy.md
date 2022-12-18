

| | TEST REPO 1 |  TEST REPO 2 | TEST REPO 3 | TEST REPO 4 | TEST REPO 5 | TEST REPO 6 | Custom library |
|--|--|--|--|--|--|--|--|
| How many unit tests? | 239 tests  | deprecated | red | red 50% | - | - | -
| Unit test in pipiline? | + | - | - | - | - |  -| -
| Responsible person |  |  | Unit 1 | Unit 2 | Unit 3 |  Unit 4 | 



#What we cover by unit tests:
##Components
  - Test business logic
  - Test template rendering ([ng-mocks](https://ng-mocks.sudo.eu/), snapshots, **without TestBed**). At least rendering upon initialisation should be tested.
  - Mock all dependencies with [createSpyObj](Link to SPY Object). Use [MockBuilder](https://ng-mocks.sudo.eu/api/MockBuilder) and [MockRender](https://ng-mocks.sudo.eu/api/MockRender) for instantiation.
  - **Don't mock** utils, constants, models, configs whenever possible.
  - [Minimal examples](Example to unit tests)
##Services 
  - Use basic TS instance (**without ng-mocks and TestBed**)
  - Instantiate passing mocked dependencies with [createSpyObj](Link to SPY Object)
  - Example from DTC ([link](Example to unit tests for services))
##Utils 
  - functions
  - providers (optional)

##States

##Observables
 - Test streams exposed through public API by any entity under test (Component, Service, Provider, etc.)
 - Dealing with observables, avoid mocking asynchronous streams with synchronous ones (e.g. default creator function of()) since it won't test actual behaviour of unit under test.
 - Aim to use _“subscribe and assert pattern”_ whenever possible, which will cover most of the cases.
 - When using _“subscribe and assert pattern”_ you will most probably have to deal with asynchronous behaviour (if not, there is a high probability that [your observable test is wrong](https://netbasal.com/testing-observables-in-angular-a2dbbfaf5329) in essence). It's **strongly recommended** to apply [fakeAsync](https://angular.io/api/core/testing/fakeAsync) utility, and only fallback to other utilities (e.g. _done callback_, _waitForAsync_, etc) if you have **strong arguments** (e.g. kind of edge case you faced).
 - Unsubscribing from an observables when testing is not necessary, and should be avoided in order to reduce test logic. You can unsubscribe though (use [Subsink](link to subsink util) utility) in case of a need (e.g. observable under test is tested for multiple scenarios, and it is [hot](https://rxjs.dev/guide/glossary-and-semantics#hot).
 - There may be situation when _“subscribe and assert pattern”_ is not enough (e.g. need to test multiple values over time or/and proper sequence of values and timespan between, etc.) use [marble testing](https://rxjs.dev/guide/testing/marble-testing).
 - When testing with marbles, it's a requirement to use **_ONLY_** - [native rxjs TestScheduler](https://rxjs.dev/api/testing/TestScheduler), and avoid any wrappers such as jasmine-marbles, jest-marbles, etc.
 - Useful links:
   - [Examples of observables testing strategies](link)
   - [Observable testing strategies presentation](link)

##Technologies:
- [Jest](https://jestjs.io/)
- [ng-mocks](https://ng-mocks.sudo.eu/)
- [rxjs TestScheduler](https://rxjs.dev/api/testing/TestScheduler)
- [aug](https://github.com/vkotlyar3/aug#readme) optional
