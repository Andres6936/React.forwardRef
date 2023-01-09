### Interface Initial

Request to create an application with infinite Checkboxes, whose behavior is to be able to add Checkboxes just by editing a line of code, each Chekbox must be concatenated together with the message once the user enters a new one.

It makes use of React hooks and references to create components dynamically.

Initially 3 Checkboxes are declared in the code, but by simply editing the line mentioned below, an infinite number of Checkboxes can be added.

For added more checkbox in the interface, modified this line:

```javascript
useCheckboxGroup(useMemo(() => ['sport', 'movies', 'finance'], []))
```

<img style="border-radius: 1em" alt="Start Image" src="./docs/Start.png" width="50%">


Req. 1: Verify that a category is selected.

<img style="border-radius: 1em" alt="Middle Image" src="./docs/Middle.png" width="50%">

Req. 2: Verify that the user write a message.

<img style="border-radius: 1em" alt="End Image" src="./docs/End.png" width="50%">

### How to start

````shell
npm install & npm run dev
````
