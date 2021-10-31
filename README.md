# Live Alert BP Formatter JSlint

The JSlint message formatter for [live-alert-bp](https://github.com/semiromid/live-alert-bp)


##  Install
```shell
npm i live-alert-bp-formatter-jshint --save-dev
```

## How to use

```javascript
  liveAlert.open(
    liveAlertFormatterJSlint(MessagesJSlint)
  );
```


## Examples how to use

[Examples](https://github.com/semiromid/live-alert-bp#examples)

## API

```javascript
const formatterJSlint = require("live-alert-bp-formatter-jshint");

formatterJSlint(messages, user_style, filter)
```

* return:  formatted messages for [live-alert-bp](https://github.com/semiromid/live-alert-bp)

#### messages
* Type: `Array`

JSlint messages

#### user_style
* Type: `ObjectJSON`

Set custom style messages

Exmaple:
```javascript
  const style = {};	

  style.label = {
	error: { backgroundColor: '#ff0000', color: '#ffffff' },
	warning: { backgroundColor: 'yellow', color: '#000000' },
	info: { backgroundColor: '#90ee90', color: '#000000' }
  };

  style.file = 'color: #90ee90 !important; text-decoration: underline !important;';
	
  style.line = {
	field: 'color: #aaaaaa !important; padding-left: 7px !important;', 
	message: 'color: #ffffff !important; padding-left: 3px !important;'
  };
	
  style.column = {
	field: 'color: #aaaaaa !important; padding-left: 7px !important;', 
	message: 'color: #ffffff !important; padding-left: 3px !important;'
  };

  style.evidence = {
	field: 'color: #aaaaaa !important; display: block !important; padding-bottom: 8px !important;', 
	message: 'box-sizing: border-box !important; width: 100% !important; overflow-x: auto !important; color: #ffffff !important; display: inline-block !important; border: dashed 1px #b9b9b9 !important; padding: 20px !important;'
  };

  style.reason = {
	field: 'color: #aaaaaa !important; display: block !important;  padding-top: 3px !important;', 
		message: 'color: #ffffff !important;'
  };	
```

#### filter
* Type: `Array`

Message level filter. 
`E` is error, `W` is warning, `I` is info.

Example
```
  liveAlert.open(
    liveAlertFormatterESlint(MessagesESLint, {}, ['W', 'I'])
  );
```
