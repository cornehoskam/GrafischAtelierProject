/*
 @license
 dhtmlxScheduler v.4.4.0 Professional

 This software can be used only as part of dhtmlx.com site.
 You are not allowed to use it on any other site

 (c) Dinamenta, UAB.


 */
function dtmlXMLLoaderObject(e, t, i, a) {
	return this.xmlDoc = "", "undefined" != typeof i ? this.async = i : this.async = !0, this.onloadAction = e || null, this.mainObject = t || null, this.waitCall = null, this.rSeed = a || !1, this
}
function callerFunction(e, t) {
	return this.handler = function (i) {
		return i || (i = window.event), e(i, t), !0
	}, this.handler
}
function getAbsoluteLeft(e) {
	return getOffset(e).left
}
function getAbsoluteTop(e) {
	return getOffset(e).top
}
function getOffsetSum(e) {
	for (var t = 0, i = 0; e;)t += parseInt(e.offsetTop), i += parseInt(e.offsetLeft),
		e = e.offsetParent;
	return {top: t, left: i}
}
function getOffsetRect(e) {
	var t = e.getBoundingClientRect(), i = document.body, a = document.documentElement, r = window.pageYOffset || a.scrollTop || i.scrollTop, s = window.pageXOffset || a.scrollLeft || i.scrollLeft, n = a.clientTop || i.clientTop || 0, d = a.clientLeft || i.clientLeft || 0, l = t.top + r - n, o = t.left + s - d;
	return {top: Math.round(l), left: Math.round(o)}
}
function getOffset(e) {
	return e.getBoundingClientRect ? getOffsetRect(e) : getOffsetSum(e)
}
function convertStringToBoolean(e) {
	switch ("string" == typeof e && (e = e.toLowerCase()),
		e) {
		case"1":
		case"true":
		case"yes":
		case"y":
		case 1:
		case!0:
			return !0;
		default:
			return !1
	}
}
function getUrlSymbol(e) {
	return -1 != e.indexOf("?") ? "&" : "?"
}
function dhtmlDragAndDropObject() {
	return window.dhtmlDragAndDrop ? window.dhtmlDragAndDrop : (this.lastLanding = 0, this.dragNode = 0, this.dragStartNode = 0, this.dragStartObject = 0, this.tempDOMU = null, this.tempDOMM = null, this.waitDrag = 0, window.dhtmlDragAndDrop = this, this)
}
function _dhtmlxError(e, t, i) {
	return this.catches || (this.catches = []), this
}
function dhtmlXHeir(e, t) {
	for (var i in t)"function" == typeof t[i] && (e[i] = t[i]);
	return e
}
function dataProcessor(e) {
	return this.serverProcessor = e, this.action_param = "!nativeeditor_status", this.object = null, this.updatedRows = [], this.autoUpdate = !0, this.updateMode = "cell", this._tMode = "GET", this.post_delim = "_", this._waitMode = 0, this._in_progress = {}, this._invalid = {}, this.mandatoryFields = [], this.messages = [], this.styles = {
		updated: "font-weight:bold;",
		inserted: "font-weight:bold;",
		deleted: "text-decoration : line-through;",
		invalid: "background-color:FFE0E0;",
		invalid_cell: "border-bottom:2px solid red;",
		error: "color:red;",
		clear: "font-weight:normal;text-decoration:none;"
	}, this.enableUTFencoding(!0), dhtmlxEventable(this), this
}
window.dhtmlXScheduler = window.scheduler = {version: "4.4.0"}, window.dhtmlx || (dhtmlx = function (e) {
	for (var t in e)dhtmlx[t] = e[t];
	return dhtmlx
}), dhtmlx.extend_api = function (e, t, i) {
	var a = window[e];
	a && (window[e] = function (e) {
		var i;
		if (e && "object" == typeof e && !e.tagName) {
			i = a.apply(this, t._init ? t._init(e) : arguments);
			for (var r in dhtmlx)t[r] && this[t[r]](dhtmlx[r]);
			for (var r in e)t[r] ? this[t[r]](e[r]) : 0 === r.indexOf("on") && this.attachEvent(r, e[r]);
		} else i = a.apply(this, arguments);
		return t._patch && t._patch(this), i || this
	}, window[e].prototype = a.prototype, i && dhtmlXHeir(window[e].prototype, i))
}, dhtmlxAjax = {
	get: function (e, t) {
		var i = new dtmlXMLLoaderObject(!0);
		return i.async = arguments.length < 3, i.waitCall = t, i.loadXML(e), i
	}, post: function (e, t, i) {
		var a = new dtmlXMLLoaderObject(!0);
		return a.async = arguments.length < 4, a.waitCall = i, a.loadXML(e, !0, t), a
	}, getSync: function (e) {
		return this.get(e, null, !0)
	}, postSync: function (e, t) {
		return this.post(e, t, null, !0)
	}
}, dtmlXMLLoaderObject.count = 0,
	dtmlXMLLoaderObject.prototype.waitLoadFunction = function (e) {
		var t = !0;
		return this.check = function () {
			if (e && e.onloadAction && (!e.xmlDoc.readyState || 4 == e.xmlDoc.readyState)) {
				if (!t)return;
				t = !1, dtmlXMLLoaderObject.count++, "function" == typeof e.onloadAction && e.onloadAction(e.mainObject, null, null, null, e), e.waitCall && (e.waitCall.call(this, e), e.waitCall = null)
			}
		}, this.check
	}, dtmlXMLLoaderObject.prototype.getXMLTopNode = function (e, t) {
	var i;
	if (this.xmlDoc.responseXML) {
		var a = this.xmlDoc.responseXML.getElementsByTagName(e);
		if (0 === a.length && -1 != e.indexOf(":"))var a = this.xmlDoc.responseXML.getElementsByTagName(e.split(":")[1]);
		i = a[0]
	} else i = this.xmlDoc.documentElement;
	if (i)return this._retry = !1, i;
	if (!this._retry && _isIE) {
		this._retry = !0;
		var t = this.xmlDoc;
		return this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0), this.getXMLTopNode(e, t)
	}
	return dhtmlxError.throwError("LoadXML", "Incorrect XML", [t || this.xmlDoc, this.mainObject]), document.createElement("DIV")
}, dtmlXMLLoaderObject.prototype.loadXMLString = function (e, t) {
	if (_isIE) this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"), this.xmlDoc.async = this.async, this.xmlDoc.onreadystatechange = function () {
	}, this.xmlDoc.loadXML(e); else {
		var i = new DOMParser;
		this.xmlDoc = i.parseFromString(e, "text/xml")
	}
	t || (this.onloadAction && this.onloadAction(this.mainObject, null, null, null, this), this.waitCall && (this.waitCall(), this.waitCall = null))
}, dtmlXMLLoaderObject.prototype.loadXML = function (e, t, i, a) {
	this.rSeed && (e += (-1 != e.indexOf("?") ? "&" : "?") + "a_dhx_rSeed=" + (new Date).valueOf()), this.filePath = e,
		!_isIE && window.XMLHttpRequest ? this.xmlDoc = new XMLHttpRequest : this.xmlDoc = new ActiveXObject("Microsoft.XMLHTTP"), this.async && (this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)), "string" == typeof t ? this.xmlDoc.open(t, e, this.async) : this.xmlDoc.open(t ? "POST" : "GET", e, this.async), a ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"), this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : t && this.xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
		this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xmlDoc.send(i), this.async || new this.waitLoadFunction(this)()
}, dtmlXMLLoaderObject.prototype.destructor = function () {
	return this._filterXPath = null, this._getAllNamedChilds = null, this._retry = null, this.async = null, this.rSeed = null, this.filePath = null, this.onloadAction = null, this.mainObject = null, this.xmlDoc = null, this.doXPath = null, this.doXPathOpera = null, this.doXSLTransToObject = null, this.doXSLTransToString = null, this.loadXML = null, this.loadXMLString = null,
		this.doSerialization = null, this.xmlNodeToJSON = null, this.getXMLTopNode = null, this.setXSLParamValue = null, null
}, dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function (e) {
	for (var t = {}, i = 0; i < e.attributes.length; i++)t[e.attributes[i].name] = e.attributes[i].value;
	t._tagvalue = e.firstChild ? e.firstChild.nodeValue : "";
	for (var i = 0; i < e.childNodes.length; i++) {
		var a = e.childNodes[i].tagName;
		a && (t[a] || (t[a] = []), t[a].push(this.xmlNodeToJSON(e.childNodes[i])))
	}
	return t
}, dhtmlDragAndDropObject.prototype.removeDraggableItem = function (e) {
	e.onmousedown = null, e.dragStarter = null, e.dragLanding = null
}, dhtmlDragAndDropObject.prototype.addDraggableItem = function (e, t) {
	e.onmousedown = this.preCreateDragCopy, e.dragStarter = t, this.addDragLanding(e, t)
}, dhtmlDragAndDropObject.prototype.addDragLanding = function (e, t) {
	e.dragLanding = t
}, dhtmlDragAndDropObject.prototype.preCreateDragCopy = function (e) {
	return !e && !window.event || 2 != (e || event).button ? window.dhtmlDragAndDrop.waitDrag ? (window.dhtmlDragAndDrop.waitDrag = 0, document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU,
				document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM, !1) : (window.dhtmlDragAndDrop.dragNode && window.dhtmlDragAndDrop.stopDrag(e), window.dhtmlDragAndDrop.waitDrag = 1, window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup, window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove, window.dhtmlDragAndDrop.dragStartNode = this, window.dhtmlDragAndDrop.dragStartObject = this.dragStarter, document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy, document.body.onmousemove = window.dhtmlDragAndDrop.callDrag,
				window.dhtmlDragAndDrop.downtime = (new Date).valueOf(), e && e.preventDefault ? (e.preventDefault(), !1) : !1) : void 0
}, dhtmlDragAndDropObject.prototype.callDrag = function (e) {
	e || (e = window.event);
	var t = window.dhtmlDragAndDrop;
	if (!((new Date).valueOf() - t.downtime < 100)) {
		if (!t.dragNode) {
			if (!t.waitDrag)return t.stopDrag(e, !0);
			if (t.dragNode = t.dragStartObject._createDragNode(t.dragStartNode, e), !t.dragNode)return t.stopDrag();
			t.dragNode.onselectstart = function () {
				return !1
			}, t.gldragNode = t.dragNode, document.body.appendChild(t.dragNode),
				document.body.onmouseup = t.stopDrag, t.waitDrag = 0, t.dragNode.pWindow = window, t.initFrameRoute()
		}
		if (t.dragNode.parentNode != window.document.body && t.gldragNode) {
			var i = t.gldragNode;
			t.gldragNode.old && (i = t.gldragNode.old), i.parentNode.removeChild(i);
			var a = t.dragNode.pWindow;
			if (i.pWindow && i.pWindow.dhtmlDragAndDrop.lastLanding && i.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(i.pWindow.dhtmlDragAndDrop.lastLanding), _isIE) {
				var r = document.createElement("Div");
				r.innerHTML = t.dragNode.outerHTML, t.dragNode = r.childNodes[0];
			} else t.dragNode = t.dragNode.cloneNode(!0);
			t.dragNode.pWindow = window, t.gldragNode.old = t.dragNode, document.body.appendChild(t.dragNode), a.dhtmlDragAndDrop.dragNode = t.dragNode
		}
		t.dragNode.style.left = e.clientX + 15 + (t.fx ? -1 * t.fx : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px", t.dragNode.style.top = e.clientY + 3 + (t.fy ? -1 * t.fy : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
		var s;
		s = e.srcElement ? e.srcElement : e.target, t.checkLanding(s, e)
	}
}, dhtmlDragAndDropObject.prototype.calculateFramePosition = function (e) {
	if (window.name) {
		for (var t = parent.frames[window.name].frameElement.offsetParent, i = 0, a = 0; t;)i += t.offsetLeft, a += t.offsetTop, t = t.offsetParent;
		if (parent.dhtmlDragAndDrop) {
			var r = parent.dhtmlDragAndDrop.calculateFramePosition(1);
			i += 1 * r.split("_")[0], a += 1 * r.split("_")[1]
		}
		if (e)return i + "_" + a;
		this.fx = i, this.fy = a
	}
	return "0_0"
}, dhtmlDragAndDropObject.prototype.checkLanding = function (e, t) {
	e && e.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding), this.lastLanding = e, this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, t.clientX, t.clientY, t),
			this.lastLanding_scr = _isIE ? t.srcElement : t.target) : e && "BODY" != e.tagName ? this.checkLanding(e.parentNode, t) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, t.clientX, t.clientY, t), this.lastLanding = 0, this._onNotFound && this._onNotFound())
}, dhtmlDragAndDropObject.prototype.stopDrag = function (e, t) {
	var i = window.dhtmlDragAndDrop;
	if (!t) {
		i.stopFrameRoute();
		var a = i.lastLanding;
		i.lastLanding = null, a && a.dragLanding._drag(i.dragStartNode, i.dragStartObject, a, _isIE ? event.srcElement : e.target);
	}
	i.lastLanding = null, i.dragNode && i.dragNode.parentNode == document.body && i.dragNode.parentNode.removeChild(i.dragNode), i.dragNode = 0, i.gldragNode = 0, i.fx = 0, i.fy = 0, i.dragStartNode = 0, i.dragStartObject = 0, document.body.onmouseup = i.tempDOMU, document.body.onmousemove = i.tempDOMM, i.tempDOMU = null, i.tempDOMM = null, i.waitDrag = 0
}, dhtmlDragAndDropObject.prototype.stopFrameRoute = function (e) {
	e && window.dhtmlDragAndDrop.stopDrag(1, 1);
	for (var t = 0; t < window.frames.length; t++)try {
		window.frames[t] != e && window.frames[t].dhtmlDragAndDrop && window.frames[t].dhtmlDragAndDrop.stopFrameRoute(window);
	} catch (i) {
	}
	try {
		parent.dhtmlDragAndDrop && parent != window && parent != e && parent.dhtmlDragAndDrop.stopFrameRoute(window)
	} catch (i) {
	}
}, dhtmlDragAndDropObject.prototype.initFrameRoute = function (e, t) {
	e && (window.dhtmlDragAndDrop.preCreateDragCopy(), window.dhtmlDragAndDrop.dragStartNode = e.dhtmlDragAndDrop.dragStartNode, window.dhtmlDragAndDrop.dragStartObject = e.dhtmlDragAndDrop.dragStartObject, window.dhtmlDragAndDrop.dragNode = e.dhtmlDragAndDrop.dragNode, window.dhtmlDragAndDrop.gldragNode = e.dhtmlDragAndDrop.dragNode,
		window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag, window.waitDrag = 0, !_isIE && t && (!_isFF || _FFrv < 1.8) && window.dhtmlDragAndDrop.calculateFramePosition());
	try {
		parent.dhtmlDragAndDrop && parent != window && parent != e && parent.dhtmlDragAndDrop.initFrameRoute(window)
	} catch (i) {
	}
	for (var a = 0; a < window.frames.length; a++)try {
		window.frames[a] != e && window.frames[a].dhtmlDragAndDrop && window.frames[a].dhtmlDragAndDrop.initFrameRoute(window, !e || t ? 1 : 0)
	} catch (i) {
	}
}, _isFF = !1, _isIE = !1, _isOpera = !1, _isKHTML = !1, _isMacOS = !1,
	_isChrome = !1, _FFrv = !1, _KHTMLrv = !1, _OperaRv = !1, -1 != navigator.userAgent.indexOf("Macintosh") && (_isMacOS = !0), navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && (_isChrome = !0), -1 != navigator.userAgent.indexOf("Safari") || -1 != navigator.userAgent.indexOf("Konqueror") ? (_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)), _KHTMLrv > 525 ? (_isFF = !0, _FFrv = 1.9) : _isKHTML = !0) : -1 != navigator.userAgent.indexOf("Opera") ? (_isOpera = !0, _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))) : -1 != navigator.appName.indexOf("Microsoft") ? (_isIE = !0,
			-1 == navigator.appVersion.indexOf("MSIE 8.0") && -1 == navigator.appVersion.indexOf("MSIE 9.0") && -1 == navigator.appVersion.indexOf("MSIE 10.0") || "BackCompat" == document.compatMode || (_isIE = 8)) : "Netscape" == navigator.appName && -1 != navigator.userAgent.indexOf("Trident") ? _isIE = 8 : (_isFF = !0, _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])), dtmlXMLLoaderObject.prototype.doXPath = function (e, t, i, a) {
	if (_isKHTML || !_isIE && !window.XPathResult)return this.doXPathOpera(e, t);
	if (_isIE)return t || (t = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML),
	t || dhtmlxError.throwError("LoadXML", "Incorrect XML", [t || this.xmlDoc, this.mainObject]), i && t.setProperty("SelectionNamespaces", "xmlns:xsl='" + i + "'"), "single" == a ? t.selectSingleNode(e) : t.selectNodes(e) || new Array(0);
	var r = t;
	t || (t = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML), t || dhtmlxError.throwError("LoadXML", "Incorrect XML", [t || this.xmlDoc, this.mainObject]), -1 != t.nodeName.indexOf("document") ? r = t : (r = t, t = t.ownerDocument);
	var s = XPathResult.ANY_TYPE;
	"single" == a && (s = XPathResult.FIRST_ORDERED_NODE_TYPE);
	var n = [], d = t.evaluate(e, r, function (e) {
		return i
	}, s, null);
	if (s == XPathResult.FIRST_ORDERED_NODE_TYPE)return d.singleNodeValue;
	for (var l = d.iterateNext(); l;)n[n.length] = l, l = d.iterateNext();
	return n
}, _dhtmlxError.prototype.catchError = function (e, t) {
	this.catches[e] = t
}, _dhtmlxError.prototype.throwError = function (e, t, i) {
	return this.catches[e] ? this.catches[e](e, t, i) : this.catches.ALL ? this.catches.ALL(e, t, i) : (window.alert("Error type: " + arguments[0] + "\nDescription: " + arguments[1]), null)
}, window.dhtmlxError = new _dhtmlxError,
	dtmlXMLLoaderObject.prototype.doXPathOpera = function (e, t) {
		var i = e.replace(/[\/]+/gi, "/").split("/"), a = null, r = 1;
		if (!i.length)return [];
		if ("." == i[0]) a = [t]; else {
			if ("" !== i[0])return [];
			a = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(i[r].replace(/\[[^\]]*\]/g, "")), r++
		}
		for (r; r < i.length; r++)a = this._getAllNamedChilds(a, i[r]);
		return -1 != i[r - 1].indexOf("[") && (a = this._filterXPath(a, i[r - 1])), a
	}, dtmlXMLLoaderObject.prototype._filterXPath = function (e, t) {
	for (var i = [], t = t.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), a = 0; a < e.length; a++)e[a].getAttribute(t) && (i[i.length] = e[a]);
	return i
}, dtmlXMLLoaderObject.prototype._getAllNamedChilds = function (e, t) {
	var i = [];
	_isKHTML && (t = t.toUpperCase());
	for (var a = 0; a < e.length; a++)for (var r = 0; r < e[a].childNodes.length; r++)_isKHTML ? e[a].childNodes[r].tagName && e[a].childNodes[r].tagName.toUpperCase() == t && (i[i.length] = e[a].childNodes[r]) : e[a].childNodes[r].tagName == t && (i[i.length] = e[a].childNodes[r]);
	return i
}, "undefined" == typeof window.dhtmlxEvent && (window.dhtmlxEvent = function (e, t, i) {
	e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent && e.attachEvent("on" + t, i);
}), dtmlXMLLoaderObject.prototype.xslDoc = null, dtmlXMLLoaderObject.prototype.setXSLParamValue = function (e, t, i) {
	i || (i = this.xslDoc), i.responseXML && (i = i.responseXML);
	var a = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + e + "']", i, "http://www.w3.org/1999/XSL/Transform", "single");
	a && (a.firstChild.nodeValue = t)
}, dtmlXMLLoaderObject.prototype.doXSLTransToObject = function (e, t) {
	e || (e = this.xslDoc), e.responseXML && (e = e.responseXML), t || (t = this.xmlDoc), t.responseXML && (t = t.responseXML);
	var i;
	if (_isIE) {
		i = new ActiveXObject("Msxml2.DOMDocument.3.0");
		try {
			t.transformNodeToObject(e, i)
		} catch (a) {
			i = t.transformNode(e)
		}
	} else this.XSLProcessor || (this.XSLProcessor = new XSLTProcessor, this.XSLProcessor.importStylesheet(e)), i = this.XSLProcessor.transformToDocument(t);
	return i
}, dtmlXMLLoaderObject.prototype.doXSLTransToString = function (e, t) {
	var i = this.doXSLTransToObject(e, t);
	return "string" == typeof i ? i : this.doSerialization(i)
}, dtmlXMLLoaderObject.prototype.doSerialization = function (e) {
	if (e || (e = this.xmlDoc), e.responseXML && (e = e.responseXML), _isIE)return e.xml;
	var t = new XMLSerializer;
	return t.serializeToString(e)
}, dhtmlxEventable = function (obj) {
	obj.attachEvent = function (e, t, i) {
		return e = "ev_" + e.toLowerCase(), this[e] || (this[e] = new this.eventCatcher(i || this)), e + ":" + this[e].addEvent(t)
	}, obj.callEvent = function (e, t) {
		return e = "ev_" + e.toLowerCase(), this[e] ? this[e].apply(this, t) : !0
	}, obj.checkEvent = function (e) {
		return !!this["ev_" + e.toLowerCase()]
	}, obj.eventCatcher = function (obj) {
		var dhx_catch = [], z = function () {
			for (var e = !0, t = 0; t < dhx_catch.length; t++)if (dhx_catch[t]) {
				var i = dhx_catch[t].apply(obj, arguments);
				e = e && i
			}
			return e
		};
		return z.addEvent = function (ev) {
			return "function" != typeof ev && (ev = eval(ev)), ev ? dhx_catch.push(ev) - 1 : !1
		}, z.removeEvent = function (e) {
			dhx_catch[e] = null
		}, z
	}, obj.detachEvent = function (e) {
		if (e) {
			var t = e.split(":");
			this[t[0]].removeEvent(t[1])
		}
	}, obj.detachAllEvents = function () {
		for (var e in this)0 === e.indexOf("ev_") && (this.detachEvent(e), this[e] = null)
	}, obj = null
}, window.dhtmlx || (window.dhtmlx = {}), function () {
	function e(e, t) {
		setTimeout(function () {
			if (e.box) {
				var a = e.callback;
				i(!1), e.box.parentNode.removeChild(e.box),
					dhtmlx.callEvent("onAfterMessagePopup", [e.box]), c = e.box = null, a && a(t)
			}
		}, 1)
	}

	function t(t) {
		if (c) {
			t = t || event;
			var i = t.which || event.keyCode, a = !1;
			if (dhtmlx.message.keyboard) {
				if (13 == i || 32 == i) {
					var r = t.target || t.srcElement;
					scheduler._getClassName(r).indexOf("dhtmlx_popup_button") > -1 && r.click ? r.click() : (e(c, !0), a = !0)
				}
				27 == i && (e(c, !1), a = !0)
			}
			if (a)return t.preventDefault && t.preventDefault(), !(t.cancelBubble = !0)
		} else;
	}

	function i(e) {
		i.cover || (i.cover = document.createElement("DIV"), i.cover.onkeydown = t, i.cover.className = "dhx_modal_cover",
			document.body.appendChild(i.cover));
		document.body.scrollHeight;
		i.cover.style.display = e ? "inline-block" : "none"
	}

	function a(e, t, i) {
		var a = scheduler._waiAria.messageButtonAttrString(e), r = i ? i : e || "", s = "dhtmlx_" + r.toLowerCase().replace(/ /g, "_") + "_button";
		return "<div " + a + "class='dhtmlx_popup_button " + s + "' result='" + t + "' ><div>" + e + "</div></div>"
	}

	function r(e) {
		u.area || (u.area = document.createElement("DIV"), u.area.className = "dhtmlx_message_area", u.area.style[u.position] = "5px", document.body.appendChild(u.area)),
			u.hide(e.id);
		var t = document.createElement("DIV");
		return t.innerHTML = "<div>" + e.text + "</div>", t.className = "dhtmlx-info dhtmlx-" + e.type, t.onclick = function () {
			u.hide(e.id), e = null
		}, scheduler._waiAria.messageInfoAttr(t), "bottom" == u.position && u.area.firstChild ? u.area.insertBefore(t, u.area.firstChild) : u.area.appendChild(t), e.expire > 0 && (u.timers[e.id] = window.setTimeout(function () {
			u.hide(e.id)
		}, e.expire)), u.pull[e.id] = t, t = null, e.id
	}

	function s(t, i, r) {
		var s = document.createElement("DIV");
		s.className = " dhtmlx_modal_box dhtmlx-" + t.type,
			s.setAttribute("dhxbox", 1);
		var n = scheduler.uid();
		scheduler._waiAria.messageModalAttr(s, n);
		var d = "", l = !1;
		if (t.width && (s.style.width = t.width), t.height && (s.style.height = t.height), t.title && (d += '<div class="dhtmlx_popup_title" id="' + n + '">' + t.title + "</div>", l = !0), d += '<div class="dhtmlx_popup_text" ' + (l ? "" : ' id="' + n + '" ') + "><span>" + (t.content ? "" : t.text) + '</span></div><div  class="dhtmlx_popup_controls">', i) {
			var o = t.ok || scheduler.locale.labels.message_ok;
			void 0 === o && (o = "OK"), d += a(o, !0, "ok")
		}
		if (r) {
			var h = t.cancel || scheduler.locale.labels.message_cancel;
			void 0 === h && (h = "Cancel"), d += a(h, !1, "cancel")
		}
		if (t.buttons)for (var _ = 0; _ < t.buttons.length; _++)d += a(t.buttons[_], _);
		if (d += "</div>", s.innerHTML = d, t.content) {
			var u = t.content;
			"string" == typeof u && (u = document.getElementById(u)), "none" == u.style.display && (u.style.display = ""), s.childNodes[t.title ? 1 : 0].appendChild(u)
		}
		return s.onclick = function (i) {
			i = i || event;
			var a = i.target || i.srcElement, r = scheduler._getClassName(a);
			if (r || (a = a.parentNode), r = scheduler._getClassName(a), "dhtmlx_popup_button" == r.split(" ")[0]) {
				var s = a.getAttribute("result");
				s = "true" == s || ("false" == s ? !1 : s), e(t, s)
			}
		}, t.box = s, c = t, s
	}

	function n(e, a, r) {
		var n = e.tagName ? e : s(e, a, r);
		e.hidden || i(!0), document.body.appendChild(n);
		var d = Math.abs(Math.floor(((window.innerWidth || document.documentElement.offsetWidth) - n.offsetWidth) / 2)), l = Math.abs(Math.floor(((window.innerHeight || document.documentElement.offsetHeight) - n.offsetHeight) / 2));
		return "top" == e.position ? n.style.top = "-3px" : n.style.top = l + "px", n.style.left = d + "px", n.onkeydown = t, dhtmlx.modalbox.focus(n), e.hidden && dhtmlx.modalbox.hide(n),
			dhtmlx.callEvent("onMessagePopup", [n]), n
	}

	function d(e) {
		return n(e, !0, !1)
	}

	function l(e) {
		return n(e, !0, !0)
	}

	function o(e) {
		return n(e)
	}

	function h(e, t, i) {
		return "object" != typeof e && ("function" == typeof t && (i = t, t = ""), e = {
			text: e,
			type: t,
			callback: i
		}), e
	}

	function _(e, t, i, a) {
		return "object" != typeof e && (e = {
			text: e,
			type: t,
			expire: i,
			id: a
		}), e.id = e.id || u.uid(), e.expire = e.expire || u.expire, e
	}

	var c = null;
	document.attachEvent ? document.attachEvent("onkeydown", t) : document.addEventListener("keydown", t, !0), dhtmlx.alert = function () {
		var e = h.apply(this, arguments);
		return e.type = e.type || "confirm", d(e)
	}, dhtmlx.confirm = function () {
		var e = h.apply(this, arguments);
		return e.type = e.type || "alert", l(e)
	}, dhtmlx.modalbox = function () {
		var e = h.apply(this, arguments);
		return e.type = e.type || "alert", o(e)
	}, dhtmlx.modalbox.hide = function (e) {
		for (; e && e.getAttribute && !e.getAttribute("dhxbox");)e = e.parentNode;
		e && (e.parentNode.removeChild(e), i(!1))
	}, dhtmlx.modalbox.focus = function (e) {
		setTimeout(function () {
			var t = scheduler._getFocusableNodes(e);
			t.length && t[0].focus && t[0].focus();
		}, 1)
	};
	var u = dhtmlx.message = function (e, t, i, a) {
		e = _.apply(this, arguments), e.type = e.type || "info";
		var s = e.type.split("-")[0];
		switch (s) {
			case"alert":
				return d(e);
			case"confirm":
				return l(e);
			case"modalbox":
				return o(e);
			default:
				return r(e)
		}
	};
	u.seed = (new Date).valueOf(), u.uid = function () {
		return u.seed++
	}, u.expire = 4e3, u.keyboard = !0, u.position = "top", u.pull = {}, u.timers = {}, u.hideAll = function () {
		for (var e in u.pull)u.hide(e)
	}, u.hide = function (e) {
		var t = u.pull[e];
		t && t.parentNode && (window.setTimeout(function () {
			t.parentNode.removeChild(t),
				t = null
		}, 2e3), t.className += " hidden", u.timers[e] && window.clearTimeout(u.timers[e]), delete u.pull[e])
	}
}(), dhtmlx.attachEvent || dhtmlxEventable(dhtmlx), dataProcessor.prototype = {
	setTransactionMode: function (e, t) {
		this._tMode = e, this._tSend = t, "REST" == e && (this._tSend = !1, this._endnm = !0)
	}, escape: function (e) {
		return this._utf ? encodeURIComponent(e) : escape(e)
	}, enableUTFencoding: function (e) {
		this._utf = convertStringToBoolean(e)
	}, setDataColumns: function (e) {
		this._columns = "string" == typeof e ? e.split(",") : e
	}, getSyncState: function () {
		return !this.updatedRows.length
	}, enableDataNames: function (e) {
		this._endnm = convertStringToBoolean(e)
	}, enablePartialDataSend: function (e) {
		this._changed = convertStringToBoolean(e)
	}, setUpdateMode: function (e, t) {
		this.autoUpdate = "cell" == e, this.updateMode = e, this.dnd = t
	}, ignore: function (e, t) {
		this._silent_mode = !0, e.call(t || window), this._silent_mode = !1
	}, setUpdated: function (e, t, i) {
		if (!this._silent_mode) {
			var a = this.findRow(e);
			i = i || "updated";
			var r = this.obj.getUserData(e, this.action_param);
			r && "updated" == i && (i = r), t ? (this.set_invalid(e, !1),
					this.updatedRows[a] = e, this.obj.setUserData(e, this.action_param, i), this._in_progress[e] && (this._in_progress[e] = "wait")) : this.is_invalid(e) || (this.updatedRows.splice(a, 1), this.obj.setUserData(e, this.action_param, "")), t || this._clearUpdateFlag(e), this.markRow(e, t, i), t && this.autoUpdate && this.sendData(e)
		}
	}, _clearUpdateFlag: function (e) {
	}, markRow: function (e, t, i) {
		var a = "", r = this.is_invalid(e);
		if (r && (a = this.styles[r], t = !0), this.callEvent("onRowMark", [e, t, i, r]) && (a = this.styles[t ? i : "clear"] + a, this.obj[this._methods[0]](e, a),
			r && r.details)) {
			a += this.styles[r + "_cell"];
			for (var s = 0; s < r.details.length; s++)r.details[s] && this.obj[this._methods[1]](e, s, a)
		}
	}, getState: function (e) {
		return this.obj.getUserData(e, this.action_param)
	}, is_invalid: function (e) {
		return this._invalid[e]
	}, set_invalid: function (e, t, i) {
		i && (t = {
			value: t, details: i, toString: function () {
				return this.value.toString()
			}
		}), this._invalid[e] = t
	}, checkBeforeUpdate: function (e) {
		return !0
	}, sendData: function (e) {
		return !this._waitMode || "tree" != this.obj.mytype && !this.obj._h2 ? (this.obj.editStop && this.obj.editStop(),
				"undefined" == typeof e || this._tSend ? this.sendAllData() : this._in_progress[e] ? !1 : (this.messages = [], !this.checkBeforeUpdate(e) && this.callEvent("onValidationError", [e, this.messages]) ? !1 : void this._beforeSendData(this._getRowData(e), e))) : void 0
	}, _beforeSendData: function (e, t) {
		return this.callEvent("onBeforeUpdate", [t, this.getState(t), e]) ? void this._sendData(e, t) : !1
	}, serialize: function (e, t) {
		if ("string" == typeof e)return e;
		if ("undefined" != typeof t)return this.serialize_one(e, "");
		var i = [], a = [];
		for (var r in e)e.hasOwnProperty(r) && (i.push(this.serialize_one(e[r], r + this.post_delim)),
			a.push(r));
		return i.push("ids=" + this.escape(a.join(","))), dhtmlx.security_key && i.push("dhx_security=" + dhtmlx.security_key), i.join("&")
	}, serialize_one: function (e, t) {
		if ("string" == typeof e)return e;
		var i = [];
		for (var a in e)if (e.hasOwnProperty(a)) {
			if (("id" == a || a == this.action_param) && "REST" == this._tMode)continue;
			i.push(this.escape((t || "") + a) + "=" + this.escape(e[a]))
		}
		return i.join("&")
	}, _sendData: function (e, t) {
		if (e) {
			if (!this.callEvent("onBeforeDataSending", t ? [t, this.getState(t), e] : [null, null, e]))return !1;
			t && (this._in_progress[t] = (new Date).valueOf());
			var i = new dtmlXMLLoaderObject(function (i, a, r, s, n) {
				var d = [];
				if (t) d.push(t); else if (e)for (var l in e)d.push(l);
				return i.afterUpdate(i, n, d)
			}, this, !0), a = this.serverProcessor + (this._user ? getUrlSymbol(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + this.obj.getUserData(0, "version")].join("&") : "");
			if ("GET" == this._tMode) i.loadXML(a + (-1 != a.indexOf("?") ? "&" : "?") + this.serialize(e, t)); else if ("POST" == this._tMode) i.loadXML(a, !0, this.serialize(e, t)); else if ("REST" == this._tMode) {
				var r = this.getState(t), s = a.replace(/(\&|\?)editing\=true/, "");
				"inserted" == r ? i.loadXML(s + t, "POST", this.serialize(e, t)) : "deleted" == r ? i.loadXML(s + t, "DELETE", "") : i.loadXML(s + t, "PUT", this.serialize(e, t))
			}
			this._waitMode++
		}
	}, sendAllData: function () {
		if (this.updatedRows.length) {
			this.messages = [];
			for (var e = !0, t = 0; t < this.updatedRows.length; t++)e &= this.checkBeforeUpdate(this.updatedRows[t]);
			if (!e && !this.callEvent("onValidationError", ["", this.messages]))return !1;
			if (this._tSend) this._sendData(this._getAllData()); else for (var t = 0; t < this.updatedRows.length; t++)if (!this._in_progress[this.updatedRows[t]]) {
				if (this.is_invalid(this.updatedRows[t]))continue;
				if (this._beforeSendData(this._getRowData(this.updatedRows[t]), this.updatedRows[t]), this._waitMode && ("tree" == this.obj.mytype || this.obj._h2))return
			}
		}
	}, _getAllData: function (e) {
		for (var t = {}, i = !1, a = 0; a < this.updatedRows.length; a++) {
			var r = this.updatedRows[a];
			this._in_progress[r] || this.is_invalid(r) || this.callEvent("onBeforeUpdate", [r, this.getState(r), this._getRowData(r)]) && (t[r] = this._getRowData(r, r + this.post_delim), i = !0, this._in_progress[r] = (new Date).valueOf());
		}
		return i ? t : null
	}, setVerificator: function (e, t) {
		this.mandatoryFields[e] = t || function (e) {
				return "" !== e
			}
	}, clearVerificator: function (e) {
		this.mandatoryFields[e] = !1
	}, findRow: function (e) {
		var t = 0;
		for (t = 0; t < this.updatedRows.length && e != this.updatedRows[t]; t++);
		return t
	}, defineAction: function (e, t) {
		this._uActions || (this._uActions = []), this._uActions[e] = t
	}, afterUpdateCallback: function (e, t, i, a) {
		var r = e, s = "error" != i && "invalid" != i;
		if (s || this.set_invalid(e, i), this._uActions && this._uActions[i] && !this._uActions[i](a))return delete this._in_progress[r];
		"wait" != this._in_progress[r] && this.setUpdated(e, !1);
		var n = e;
		switch (i) {
			case"inserted":
			case"insert":
				t != e && (this.obj[this._methods[2]](e, t), e = t);
				break;
			case"delete":
			case"deleted":
				return this.obj.setUserData(e, this.action_param, "true_deleted"), this.obj[this._methods[3]](e, t), delete this._in_progress[r], this.callEvent("onAfterUpdate", [e, i, t, a])
		}
		"wait" != this._in_progress[r] ? (s && this.obj.setUserData(e, this.action_param, ""), delete this._in_progress[r]) : (delete this._in_progress[r], this.setUpdated(t, !0, this.obj.getUserData(e, this.action_param))),
			this.callEvent("onAfterUpdate", [n, i, t, a])
	}, afterUpdate: function (e, t, i) {
		if (window.JSON)try {
			var a = JSON.parse(t.xmlDoc.responseText), r = a.action || this.getState(i) || "updated", s = a.sid || i[0], n = a.tid || i[0];
			return e.afterUpdateCallback(s, n, r, a), void e.finalizeUpdate()
		} catch (d) {
		}
		if (t.getXMLTopNode("data"), !t.xmlDoc.responseXML)return this.obj && this.obj.callEvent && this.obj.callEvent("onSaveError", [i, t.xmlDoc]), this.cleanUpdate(i);
		var l = t.doXPath("//data/action");
		if (!l.length)return this.cleanUpdate(i);
		for (var o = 0; o < l.length; o++) {
			var h = l[o], r = h.getAttribute("type"), s = h.getAttribute("sid"), n = h.getAttribute("tid");
			e.afterUpdateCallback(s, n, r, h)
		}
		e.finalizeUpdate()
	}, cleanUpdate: function (e) {
		if (e)for (var t = 0; t < e.length; t++)delete this._in_progress[e[t]]
	}, finalizeUpdate: function () {
		this._waitMode && this._waitMode--, ("tree" == this.obj.mytype || this.obj._h2) && this.updatedRows.length && this.sendData(), this.callEvent("onAfterUpdateFinish", []), this.updatedRows.length || this.callEvent("onFullSync", [])
	}, init: function (e) {
		this.obj = e, this.obj._dp_init && this.obj._dp_init(this);
	}, setOnAfterUpdate: function (e) {
		this.attachEvent("onAfterUpdate", e)
	}, enableDebug: function (e) {
	}, setOnBeforeUpdateHandler: function (e) {
		this.attachEvent("onBeforeDataSending", e)
	}, setAutoUpdate: function (e, t) {
		e = e || 2e3, this._user = t || (new Date).valueOf(), this._need_update = !1, this._loader = null, this._update_busy = !1, this.attachEvent("onAfterUpdate", function (e, t, i, a) {
			this.afterAutoUpdate(e, t, i, a)
		}), this.attachEvent("onFullSync", function () {
			this.fullSync()
		});
		var i = this;
		window.setInterval(function () {
			i.loadUpdate();
		}, e)
	}, afterAutoUpdate: function (e, t, i, a) {
		return "collision" == t ? (this._need_update = !0, !1) : !0
	}, fullSync: function () {
		return this._need_update && (this._need_update = !1, this.loadUpdate()), !0
	}, getUpdates: function (e, t) {
		return this._update_busy ? !1 : (this._update_busy = !0, this._loader = this._loader || new dtmlXMLLoaderObject(!0), this._loader.async = !0, this._loader.waitCall = t, void this._loader.loadXML(e))
	}, _v: function (e) {
		return e.firstChild ? e.firstChild.nodeValue : ""
	}, _a: function (e) {
		for (var t = [], i = 0; i < e.length; i++)t[i] = this._v(e[i]);
		return t
	}, loadUpdate: function () {
		var e = this, t = this.obj.getUserData(0, "version"), i = this.serverProcessor + getUrlSymbol(this.serverProcessor) + ["dhx_user=" + this._user, "dhx_version=" + t].join("&");
		i = i.replace("editing=true&", ""), this.getUpdates(i, function () {
			var t;
			try {
				t = e._loader.doXPath("//userdata")
			} catch (i) {
				return void(e._update_busy = !1)
			}
			e.obj.setUserData(0, "version", e._v(t[0]));
			var a = e._loader.doXPath("//update");
			if (a.length) {
				e._silent_mode = !0;
				for (var r = 0; r < a.length; r++) {
					var s = a[r].getAttribute("status"), n = a[r].getAttribute("id"), d = a[r].getAttribute("parent");
					switch (s) {
						case"inserted":
							e.callEvent("insertCallback", [a[r], n, d]);
							break;
						case"updated":
							e.callEvent("updateCallback", [a[r], n, d]);
							break;
						case"deleted":
							e.callEvent("deleteCallback", [a[r], n, d])
					}
				}
				e._silent_mode = !1
			}
			e._update_busy = !1, e = null
		})
	}
}, window.dataProcessor && !dataProcessor.prototype.init_original && (dataProcessor.prototype.init_original = dataProcessor.prototype.init, dataProcessor.prototype.init = function (e) {
	this.init_original(e), e._dataprocessor = this, this.setTransactionMode("POST", !0), this.serverProcessor += (-1 != this.serverProcessor.indexOf("?") ? "&" : "?") + "editing=true";
}), dhtmlxError.catchError("LoadXML", function (e, t, i) {
	var a = i[0].responseText;
	switch (scheduler.config.ajax_error) {
		case"alert":
			window.alert(a);
			break;
		case"console":
			window.console.log(a)
	}
}), window.Scheduler = {_seed: 0}, Scheduler.plugin = function (e) {
	this._schedulerPlugins.push(e), e(window.scheduler)
}, Scheduler._schedulerPlugins = [], Scheduler.getSchedulerInstance = function () {
	var scheduler = {version: "4.4.0"};
	dhtmlxEventable(scheduler), scheduler._detachDomEvent = function (e, t, i) {
		e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i);
	}, scheduler._init_once = function () {
		function e(e) {
			for (var t = document.body; e && e != t;)e = e.parentNode;
			return !(t != e)
		}

		function t() {
			return {
				w: window.innerWidth || document.documentElement.clientWidth,
				h: window.innerHeight || document.documentElement.clientHeight
			}
		}

		function i(e, t) {
			return e.w == t.w && e.h == t.h
		}

		var a = t();
		dhtmlxEvent(window, "resize", function () {
			e(scheduler._obj) && (window.clearTimeout(scheduler._resize_timer), scheduler._resize_timer = window.setTimeout(function () {
				var r = t();
				if (!i(a, r)) {
					if (!e(scheduler._obj))return;
					scheduler.callEvent("onSchedulerResize", []) && (scheduler.update_view(), scheduler.callEvent("onAfterSchedulerResize", []))
				}
				a = r
			}, 20))
		}), scheduler._init_once = function () {
		}
	}, scheduler.init = function (e, t, i) {
		t = t || scheduler._currentDate(), i = i || "week", this._obj && this.unset_actions(), this._obj = "string" == typeof e ? document.getElementById(e) : e, this.$container = this._obj, this._skin_init && scheduler._skin_init(), scheduler.date.init(), this._els = [], this._scroll = !0, this._quirks = _isIE && "BackCompat" == document.compatMode,
			this._quirks7 = _isIE && -1 == navigator.appVersion.indexOf("MSIE 8"), this.get_elements(), this.init_templates(), this.set_actions(), this._init_once(), this._init_touch_events(), this.set_sizes(), scheduler.callEvent("onSchedulerReady", []), this.setCurrentView(t, i)
	}, scheduler.xy = {
		min_event_height: 40,
		scale_width: 50,
		scroll_width: 18,
		scale_height: 20,
		month_scale_height: 20,
		menu_width: 25,
		margin_top: 0,
		margin_left: 0,
		editor_width: 140,
		month_head_height: 22
	}, scheduler.keys = {edit_save: 13, edit_cancel: 27}, scheduler.set_sizes = function () {
		var e = this._x = this._obj.clientWidth - this.xy.margin_left, t = this._y = this._obj.clientHeight - this.xy.margin_top, i = this._table_view ? 0 : this.xy.scale_width + this.xy.scroll_width, a = this._table_view ? -1 : this.xy.scale_width;
		this.set_xy(this._els.dhx_cal_navline[0], e, this.xy.nav_height, 0, 0), this.set_xy(this._els.dhx_cal_header[0], e - i, this.xy.scale_height, a, this.xy.nav_height + (this._quirks ? -1 : 1));
		var r = this._els.dhx_cal_navline[0].offsetHeight;
		r > 0 && (this.xy.nav_height = r);
		var s = this.xy.scale_height + this.xy.nav_height + (this._quirks ? -2 : 0);
		this.set_xy(this._els.dhx_cal_data[0], e, t - (s + 2), 0, s + 2)
	}, scheduler.set_xy = function (e, t, i, a, r) {
		e.style.width = Math.max(0, t) + "px", e.style.height = Math.max(0, i) + "px", arguments.length > 3 && (e.style.left = a + "px", e.style.top = r + "px")
	}, scheduler.get_elements = function () {
		for (var e = this._obj.getElementsByTagName("DIV"), t = 0; t < e.length; t++) {
			var i = scheduler._getClassName(e[t]), a = e[t].getAttribute("name") || "";
			i && (i = i.split(" ")[0]), this._els[i] || (this._els[i] = []), this._els[i].push(e[t]);
			var r = scheduler.locale.labels[a || i];
			"string" != typeof r && a && !e[t].innerHTML && (r = a.split("_")[0]), r && (this._waiAria.labelAttr(e[t], r), e[t].innerHTML = r)
		}
	}, scheduler.unset_actions = function () {
		for (var e in this._els)if (this._click[e])for (var t = 0; t < this._els[e].length; t++)this._els[e][t].onclick = null;
		this._obj.onselectstart = null, this._obj.onmousemove = null, this._obj.onmousedown = null, this._obj.onmouseup = null, this._obj.ondblclick = null, this._obj.oncontextmenu = null
	}, scheduler.set_actions = function () {
		for (var e in this._els)if (this._click[e])for (var t = 0; t < this._els[e].length; t++)this._els[e][t].onclick = scheduler._click[e];
		this._obj.onselectstart = function (e) {
			return !1
		}, this._obj.onmousemove = function (e) {
			scheduler._temp_touch_block || scheduler._on_mouse_move(e || event)
		}, this._obj.onmousedown = function (e) {
			scheduler._ignore_next_click || scheduler._on_mouse_down(e || event)
		}, this._obj.onmouseup = function (e) {
			scheduler._ignore_next_click || scheduler._on_mouse_up(e || event)
		}, this._obj.ondblclick = function (e) {
			scheduler._on_dbl_click(e || event)
		}, this._obj.oncontextmenu = function (e) {
			var t = e || event, i = t.target || t.srcElement, a = scheduler.callEvent("onContextMenu", [scheduler._locate_event(i), t]);
			return a
		}
	}, scheduler.select = function (e) {
		this._select_id != e && (scheduler._close_not_saved(), this.editStop(!1), this.unselect(), this._select_id = e, this.updateEvent(e))
	}, scheduler.unselect = function (e) {
		if (!e || e == this._select_id) {
			var t = this._select_id;
			this._select_id = null, t && this.getEvent(t) && this.updateEvent(t)
		}
	}, scheduler.getState = function () {
		return {
			mode: this._mode,
			date: new Date(this._date),
			min_date: new Date(this._min_date),
			max_date: new Date(this._max_date),
			editor_id: this._edit_id,
			lightbox_id: this._lightbox_id,
			new_event: this._new_event,
			select_id: this._select_id,
			expanded: this.expanded,
			drag_id: this._drag_id,
			drag_mode: this._drag_mode
		}
	}, scheduler._click = {
		dhx_cal_data: function (e) {
			if (scheduler._ignore_next_click)return e.preventDefault && e.preventDefault(), e.cancelBubble = !0, scheduler._ignore_next_click = !1, !1;
			var t = e ? e.target : event.srcElement, i = scheduler._locate_event(t);
			if (e = e || event, i) {
				if (!scheduler.callEvent("onClick", [i, e]) || scheduler.config.readonly)return
			} else scheduler.callEvent("onEmptyClick", [scheduler.getActionData(e).date, e]);
			if (i && scheduler.config.select) {
				scheduler.select(i);
				var a = scheduler._getClassName(t);
				-1 != a.indexOf("_icon") && scheduler._click.buttons[a.split(" ")[1].replace("icon_", "")](i)
			} else scheduler._close_not_saved(), (new Date).valueOf() - (scheduler._new_event || 0) > 500 && scheduler.unselect()
		}, dhx_cal_prev_button: function () {
			scheduler._click.dhx_cal_next_button(0, -1)
		}, dhx_cal_next_button: function (e, t) {
			scheduler.setCurrentView(scheduler.date.add(scheduler.date[scheduler._mode + "_start"](scheduler._date), t || 1, scheduler._mode));
		}, dhx_cal_today_button: function () {
			scheduler.callEvent("onBeforeTodayDisplayed", []) && scheduler.setCurrentView(scheduler._currentDate())
		}, dhx_cal_tab: function () {
			var e = this.getAttribute("name"), t = e.substring(0, e.search("_tab"));
			scheduler.setCurrentView(scheduler._date, t)
		}, buttons: {
			"delete": function (e) {
				var t = scheduler.locale.labels.confirm_deleting;
				scheduler._dhtmlx_confirm(t, scheduler.locale.labels.title_confirm_deleting, function () {
					scheduler.deleteEvent(e)
				})
			}, edit: function (e) {
				scheduler.edit(e)
			}, save: function (e) {
				scheduler.editStop(!0)
			}, details: function (e) {
				scheduler.showLightbox(e)
			}, cancel: function (e) {
				scheduler.editStop(!1)
			}
		}
	}, scheduler._dhtmlx_confirm = function (e, t, i) {
		if (!e)return i();
		var a = {text: e};
		t && (a.title = t), i && (a.callback = function (e) {
			e && i()
		}), dhtmlx.confirm(a)
	}, scheduler.addEventNow = function (e, t, i) {
		var a = {};
		e && null !== e.constructor.toString().match(/object/i) && (a = e, e = null);
		var r = 6e4 * (this.config.event_duration || this.config.time_step);
		e || (e = a.start_date || Math.round(scheduler._currentDate().valueOf() / r) * r);
		var s = new Date(e);
		if (!t) {
			var n = this.config.first_hour;
			n > s.getHours() && (s.setHours(n), e = s.valueOf()), t = e.valueOf() + r
		}
		var d = new Date(t);
		s.valueOf() == d.valueOf() && d.setTime(d.valueOf() + r), a.start_date = a.start_date || s, a.end_date = a.end_date || d, a.text = a.text || this.locale.labels.new_event, a.id = this._drag_id = a.id || this.uid(), this._drag_mode = "new-size", this._loading = !0;
		var l = this.addEvent(a);
		return this.callEvent("onEventCreated", [this._drag_id, i]), this._loading = !1, this._drag_event = {}, this._on_mouse_up(i),
			l
	}, scheduler._on_dbl_click = function (e, t) {
		if (t = t || e.target || e.srcElement, !this.config.readonly) {
			var i = scheduler._getClassName(t).split(" ")[0];
			switch (i) {
				case"dhx_scale_holder":
				case"dhx_scale_holder_now":
				case"dhx_month_body":
				case"dhx_wa_day_data":
					if (!scheduler.config.dblclick_create)break;
					this.addEventNow(this.getActionData(e).date, null, e);
					break;
				case"dhx_cal_event":
				case"dhx_wa_ev_body":
				case"dhx_agenda_line":
				case"dhx_grid_event":
				case"dhx_cal_event_line":
				case"dhx_cal_event_clear":
					var a = this._locate_event(t);
					if (!this.callEvent("onDblClick", [a, e]))return;
					this.config.details_on_dblclick || this._table_view || !this.getEvent(a)._timed || !this.config.select ? this.showLightbox(a) : this.edit(a);
					break;
				case"dhx_time_block":
				case"dhx_cal_container":
					return;
				default:
					var r = this["dblclick_" + i];
					if (r) r.call(this, e); else if (t.parentNode && t != this)return scheduler._on_dbl_click(e, t.parentNode)
			}
		}
	}, scheduler._get_column_index = function (e) {
		var t = 0;
		if (this._cols) {
			for (var i = 0, a = 0; i + this._cols[a] < e && a < this._cols.length;)i += this._cols[a],
				a++;
			if (t = a + (this._cols[t] ? (e - i) / this._cols[t] : 0), this._ignores && t >= this._cols.length)for (; t >= 1 && this._ignores[Math.floor(t)];)t--
		}
		return t
	}, scheduler._week_indexes_from_pos = function (e) {
		if (this._cols) {
			var t = this._get_column_index(e.x);
			return e.x = Math.min(this._cols.length - 1, Math.max(0, Math.ceil(t) - 1)), e.y = Math.max(0, Math.ceil(60 * e.y / (this.config.time_step * this.config.hour_size_px)) - 1) + this.config.first_hour * (60 / this.config.time_step), e
		}
		return e
	}, scheduler._mouse_coords = function (e) {
		var t, i = document.body, a = document.documentElement;
		t = _isIE || !e.pageX && !e.pageY ? {
				x: e.clientX + (i.scrollLeft || a.scrollLeft || 0) - i.clientLeft,
				y: e.clientY + (i.scrollTop || a.scrollTop || 0) - i.clientTop
			} : {
				x: e.pageX,
				y: e.pageY
			}, t.x -= getAbsoluteLeft(this._obj) + (this._table_view ? 0 : this.xy.scale_width), t.y -= getAbsoluteTop(this._obj) + this.xy.nav_height + (this._dy_shift || 0) + this.xy.scale_height - this._els.dhx_cal_data[0].scrollTop, t.ev = e;
		var r = this["mouse_" + this._mode];
		if (r) t = r.call(this, t); else if (this._table_view) {
			var s = this._get_column_index(t.x);
			if (!this._cols || !this._colsS)return t;
			var n = 0;
			for (n = 1; n < this._colsS.heights.length && !(this._colsS.heights[n] > t.y); n++);
			t.y = Math.ceil(24 * (Math.max(0, s) + 7 * Math.max(0, n - 1)) * 60 / this.config.time_step), (scheduler._drag_mode || "month" == this._mode) && (t.y = 24 * (Math.max(0, Math.ceil(s) - 1) + 7 * Math.max(0, n - 1)) * 60 / this.config.time_step), "move" == this._drag_mode && scheduler._ignores_detected && scheduler.config.preserve_length && (t._ignores = !0, this._drag_event._event_length || (this._drag_event._event_length = this._get_real_event_length(this._drag_event.start_date, this._drag_event.end_date, {
				x_step: 1, x_unit: "day"
			}))), t.x = 0
		} else t = this._week_indexes_from_pos(t);
		return t.timestamp = +new Date, t
	}, scheduler._close_not_saved = function () {
		if ((new Date).valueOf() - (scheduler._new_event || 0) > 500 && scheduler._edit_id) {
			var e = scheduler.locale.labels.confirm_closing;
			scheduler._dhtmlx_confirm(e, scheduler.locale.labels.title_confirm_closing, function () {
				scheduler.editStop(scheduler.config.positive_closing)
			}), e && (this._drag_id = this._drag_pos = this._drag_mode = null)
		}
	}, scheduler._correct_shift = function (e, t) {
		return e -= 6e4 * (new Date(scheduler._min_date).getTimezoneOffset() - new Date(e).getTimezoneOffset()) * (t ? -1 : 1);
	}, scheduler._is_pos_changed = function (e, t) {
		function i(e, t, i) {
			return !!(Math.abs(e - t) > i)
		}

		if (!e || !this._drag_pos)return !0;
		var a = 100, r = 5;
		return !!(this._drag_pos.has_moved || !this._drag_pos.timestamp || t.timestamp - this._drag_pos.timestamp > a || i(e.ev.clientX, t.ev.clientX, r) || i(e.ev.clientY, t.ev.clientY, r))
	}, scheduler._correct_drag_start_date = function (e) {
		var t;
		scheduler.matrix && (t = scheduler.matrix[scheduler._mode]), t = t || {
				x_step: 1,
				x_unit: "day"
			}, e = new Date(e);
		var i = 1;
		return (t._start_correction || t._end_correction) && (i = 60 * (t.last_hour || 0) - (60 * e.getHours() + e.getMinutes()) || 1),
		1 * e + (scheduler._get_fictional_event_length(e, i, t) - i)
	}, scheduler._correct_drag_end_date = function (e, t) {
		var i;
		scheduler.matrix && (i = scheduler.matrix[scheduler._mode]), i = i || {x_step: 1, x_unit: "day"};
		var a = 1 * e + scheduler._get_fictional_event_length(e, t, i);
		return new Date(1 * a - (scheduler._get_fictional_event_length(a, -1, i, -1) + 1))
	}, scheduler._on_mouse_move = function (e) {
		if (this._drag_mode) {
			var t = this._mouse_coords(e);
			if (this._is_pos_changed(this._drag_pos, t)) {
				var i, a;
				if (this._edit_id != this._drag_id && this._close_not_saved(),
						!this._drag_mode)return;
				if (this._drag_pos = t, this._drag_pos.has_moved = !0, "create" == this._drag_mode) {
					if (this._close_not_saved(), this.unselect(this._select_id), this._loading = !0, i = this._get_date_from_pos(t).valueOf(), !this._drag_start) {
						var r = this.callEvent("onBeforeEventCreated", [e, this._drag_id]);
						return r ? (this._loading = !1, void(this._drag_start = i)) : void(this._loading = !1)
					}
					a = i, a == this._drag_start;
					var s = new Date(this._drag_start), n = new Date(a);
					"day" != this._mode && "week" != this._mode || s.getHours() != n.getHours() || s.getMinutes() != n.getMinutes() || (n = new Date(this._drag_start + 1e3)),
						this._drag_id = this.uid(), this.addEvent(s, n, this.locale.labels.new_event, this._drag_id, t.fields), this.callEvent("onEventCreated", [this._drag_id, e]), this._loading = !1, this._drag_mode = "new-size"
				}
				var d, l = this.getEvent(this._drag_id);
				if (scheduler.matrix && (d = scheduler.matrix[scheduler._mode]), d = d || {
							x_step: 1,
							x_unit: "day"
						}, "move" == this._drag_mode) i = this._min_date.valueOf() + 6e4 * (t.y * this.config.time_step + 24 * t.x * 60 - (scheduler._move_pos_shift || 0)), !t.custom && this._table_view && (i += 1e3 * this.date.time_part(l.start_date)),
					i = this._correct_shift(i), t._ignores && this.config.preserve_length && this._table_view ? (i = scheduler._correct_drag_start_date(i), a = scheduler._correct_drag_end_date(i, this._drag_event._event_length)) : a = l.end_date.valueOf() - (l.start_date.valueOf() - i); else {
					if (i = l.start_date.valueOf(), a = l.end_date.valueOf(), this._table_view) {
						var o = this._min_date.valueOf() + t.y * this.config.time_step * 6e4 + (t.custom ? 0 : 864e5);
						if ("month" == this._mode)if (o = this._correct_shift(o, !1), this._drag_from_start) {
							var h = 864e5;
							o <= scheduler.date.date_part(new Date(a + h - 1)).valueOf() && (i = o - h);
						} else a = o; else t.resize_from_start ? i = scheduler._correct_drag_start_date(o) : a = scheduler._correct_drag_end_date(o, 0)
					} else {
						var _ = this.date.date_part(new Date(l.end_date.valueOf() - 1)).valueOf(), c = new Date(_);
						a = _ + t.y * this.config.time_step * 6e4, a += 6e4 * (new Date(a).getTimezoneOffset() - c.getTimezoneOffset()), this._els.dhx_cal_data[0].style.cursor = "s-resize", ("week" == this._mode || "day" == this._mode) && (a = this._correct_shift(a))
					}
					if ("new-size" == this._drag_mode)if (a <= this._drag_start) {
						var u = t.shift || (this._table_view && !t.custom ? 864e5 : 0);
						i = a - (t.shift ? 0 : u), a = this._drag_start + (u || 6e4 * this.config.time_step)
					} else i = this._drag_start; else i >= a && (a = i + 6e4 * this.config.time_step)
				}
				var g = new Date(a - 1), v = new Date(i);
				if ("move" == this._drag_mode && scheduler.config.limit_drag_out && (+v < +scheduler._min_date || +a > +scheduler._max_date)) {
					if (+l.start_date < +scheduler._min_date || +l.end_date > +scheduler._max_date) v = new Date(l.start_date), a = new Date(l.end_date); else {
						var f = a - v;
						+v < +scheduler._min_date ? (v = new Date(scheduler._min_date), t._ignores && this.config.preserve_length && this._table_view ? (v = new Date(scheduler._correct_drag_start_date(v)),
								d._start_correction && (v = new Date(v.valueOf() + d._start_correction)), a = new Date(1 * v + this._get_fictional_event_length(v, this._drag_event._event_length, d))) : a = new Date(+v + f)) : (a = new Date(scheduler._max_date), t._ignores && this.config.preserve_length && this._table_view ? (d._end_correction && (a = new Date(a.valueOf() - d._end_correction)), a = new Date(1 * a - this._get_fictional_event_length(a, 0, d, !0)), v = new Date(1 * a - this._get_fictional_event_length(a, this._drag_event._event_length, d, !0)), this._ignores_detected && (v = scheduler.date.add(v, d.x_step, d.x_unit),
									a = new Date(1 * a - this._get_fictional_event_length(a, 0, d, !0)), a = scheduler.date.add(a, d.x_step, d.x_unit))) : v = new Date(+a - f))
					}
					var g = new Date(a - 1)
				}
				if (!this._table_view && !scheduler.config.all_timed && (!scheduler._get_section_view() && t.x != this._get_event_sday({
						start_date: new Date(a),
						end_date: new Date(a)
					}) || new Date(a).getHours() >= this.config.last_hour)) {
					var f = a - v, h = this._min_date.valueOf() + 24 * t.x * 60 * 6e4;
					a = scheduler.date.date_part(new Date(h)), a.setHours(this.config.last_hour), g = new Date(a - 1), "move" == this._drag_mode && (v = new Date(+a - f));
				}
				if (this._table_view || g.getDate() == v.getDate() && g.getHours() < this.config.last_hour || scheduler._allow_dnd)if (l.start_date = v, l.end_date = new Date(a), this.config.update_render) {
					var m = scheduler._els.dhx_cal_data[0].scrollTop;
					this.update_view(), scheduler._els.dhx_cal_data[0].scrollTop = m
				} else this.updateEvent(this._drag_id);
				this._table_view && this.for_rendered(this._drag_id, function (e) {
					e.className += " dhx_in_move"
				}), this.callEvent("onEventDrag", [this._drag_id, this._drag_mode, e])
			}
		} else if (scheduler.checkEvent("onMouseMove")) {
			var p = this._locate_event(e.target || e.srcElement);
			this.callEvent("onMouseMove", [p, e])
		}
	}, scheduler._on_mouse_down = function (e, t) {
		if (2 != e.button && !this.config.readonly && !this._drag_mode) {
			t = t || e.target || e.srcElement;
			var i = scheduler._getClassName(t).split(" ")[0];
			switch (i) {
				case"dhx_cal_event_line":
				case"dhx_cal_event_clear":
					this._table_view && (this._drag_mode = "move");
					break;
				case"dhx_event_move":
				case"dhx_wa_ev_body":
					this._drag_mode = "move";
					break;
				case"dhx_event_resize":
					this._drag_mode = "resize";
					var a = scheduler._getClassName(t);
					a.indexOf("dhx_event_resize_end") < 0 ? scheduler._drag_from_start = !0 : scheduler._drag_from_start = !1;
					break;
				case"dhx_scale_holder":
				case"dhx_scale_holder_now":
				case"dhx_month_body":
				case"dhx_matrix_cell":
				case"dhx_marked_timespan":
					this._drag_mode = "create";
					break;
				case"":
					if (t.parentNode)return scheduler._on_mouse_down(e, t.parentNode);
					break;
				default:
					if ((!scheduler.checkEvent("onMouseDown") || scheduler.callEvent("onMouseDown", [i])) && t.parentNode && t != this && "dhx_body" != i)return scheduler._on_mouse_down(e, t.parentNode);
					this._drag_mode = null, this._drag_id = null
			}
			if (this._drag_mode) {
				var r = this._locate_event(t);
				if (this.config["drag_" + this._drag_mode] && this.callEvent("onBeforeDrag", [r, this._drag_mode, e])) {
					if (this._drag_id = r, (this._edit_id != this._drag_id || this._edit_id && "create" == this._drag_mode) && this._close_not_saved(), !this._drag_mode)return;
					this._drag_event = scheduler._lame_clone(this.getEvent(this._drag_id) || {}), this._drag_pos = this._mouse_coords(e)
				} else this._drag_mode = this._drag_id = 0
			}
			this._drag_start = null
		}
	}, scheduler._get_private_properties = function (e) {
		var t = {};
		for (var i in e)0 === i.indexOf("_") && (t[i] = !0);
		return t
	}, scheduler._clear_temporary_properties = function (e, t) {
		var i = this._get_private_properties(e), a = this._get_private_properties(t);
		for (var r in a)i[r] || delete t[r]
	}, scheduler._on_mouse_up = function (e) {
		if (!e || 2 != e.button || !scheduler.config.touch) {
			if (this._drag_mode && this._drag_id) {
				this._els.dhx_cal_data[0].style.cursor = "default";
				var t = this._drag_id, i = this._drag_mode, a = !this._drag_pos || this._drag_pos.has_moved, r = this.getEvent(this._drag_id);
				if (a && (this._drag_event._dhx_changed || !this._drag_event.start_date || r.start_date.valueOf() != this._drag_event.start_date.valueOf() || r.end_date.valueOf() != this._drag_event.end_date.valueOf())) {
					var s = "new-size" == this._drag_mode;
					if (this.callEvent("onBeforeEventChanged", [r, e, s, this._drag_event]))if (this._drag_id = this._drag_mode = null, s && this.config.edit_on_create) {
						if (this.unselect(), this._new_event = new Date, this._table_view || this.config.details_on_create || !this.config.select || !this.isOneDayEvent(this.getEvent(t)))return scheduler.callEvent("onDragEnd", [t, i, e]), this.showLightbox(t);
						this._drag_pos = !0, this._select_id = this._edit_id = t
					} else this._new_event || this.callEvent(s ? "onEventAdded" : "onEventChanged", [t, this.getEvent(t)]); else s ? this.deleteEvent(r.id, !0) : (this._drag_event._dhx_changed = !1,
							this._clear_temporary_properties(r, this._drag_event), scheduler._lame_copy(r, this._drag_event), this.updateEvent(r.id))
				}
				this._drag_pos && (this._drag_pos.has_moved || this._drag_pos === !0) && (this._drag_id = this._drag_mode = null, this.render_view_data()), scheduler.callEvent("onDragEnd", [t, i, e])
			}
			this._drag_id = null, this._drag_mode = null, this._drag_pos = null
		}
	}, scheduler._trigger_dyn_loading = function () {
		return this._load_mode && this._load() ? (this._render_wait = !0, !0) : !1
	}, scheduler.update_view = function () {
		this._reset_ignores();
		var e = this[this._mode + "_view"];
		return e ? e(!0) : this._reset_scale(), this._trigger_dyn_loading() ? !0 : void this.render_view_data()
	}, scheduler.isViewExists = function (e) {
		return !!(scheduler[e + "_view"] || scheduler.date[e + "_start"] && scheduler.templates[e + "_date"] && scheduler.templates[e + "_scale_date"])
	}, scheduler._set_aria_buttons_attrs = function () {
		for (var e = ["dhx_cal_next_button", "dhx_cal_prev_button", "dhx_cal_tab", "dhx_cal_today_button"], t = 0; t < e.length; t++)for (var i = this._els[e[t]], a = 0; i && a < i.length; a++) {
			var r = i[a].getAttribute("name"), s = this.locale.labels[e[t]];
			r && (s = this.locale.labels[r] || s), "dhx_cal_next_button" == e[t] ? s = this.locale.labels.next : "dhx_cal_prev_button" == e[t] && (s = this.locale.labels.prev), this._waiAria.headerButtonsAttributes(i[a], s || "")
		}
	}, scheduler.updateView = function (e, t) {
		e = e || this._date, t = t || this._mode;
		var i = "dhx_cal_data", a = this._obj, r = "dhx_scheduler_" + this._mode, s = "dhx_scheduler_" + t;
		this._mode && -1 != a.className.indexOf(r) ? a.className = a.className.replace(r, s) : a.className += " " + s;
		var n = this._mode == t && this.config.preserve_scroll ? this._els[i][0].scrollTop : !1;
		this[this._mode + "_view"] && t && this._mode != t && this[this._mode + "_view"](!1), this._close_not_saved();
		var d = "dhx_multi_day";
		this._els[d] && (this._els[d][0].parentNode.removeChild(this._els[d][0]), this._els[d] = null), this._mode = t, this._date = e, this._table_view = "month" == this._mode, this._dy_shift = 0, this._set_aria_buttons_attrs();
		var l = this._els.dhx_cal_tab;
		if (l)for (var o = 0; o < l.length; o++) {
			var h = l[o], _ = h.className;
			_ = _.replace(/ active/g, ""), h.getAttribute("name") == this._mode + "_tab" ? (_ += " active", this._waiAria.headerToggleState(h, !0)) : this._waiAria.headerToggleState(h, !1),
				h.className = _
		}
		this.update_view(), "number" == typeof n && (this._els[i][0].scrollTop = n)
	}, scheduler.setCurrentView = function (e, t) {
		this.callEvent("onBeforeViewChange", [this._mode, this._date, t || this._mode, e || this._date]) && (this.updateView(e, t), this.callEvent("onViewChange", [this._mode, this._date]))
	}, scheduler._render_x_header = function (e, t, i, a, r) {
		r = r || 0;
		var s = document.createElement("DIV");
		s.className = "dhx_scale_bar", this.templates[this._mode + "_scalex_class"] && (s.className += " " + this.templates[this._mode + "_scalex_class"](i));
		var n = this._cols[e] - 1;
		"month" == this._mode && 0 === e && this.config.left_border && (s.className += " dhx_scale_bar_border", t += 1), this.set_xy(s, n, this.xy.scale_height - 2, t, r);
		var d = this.templates[this._mode + "_scale_date"](i, this._mode);
		s.innerHTML = d, this._waiAria.dayHeaderAttr(s, d), a.appendChild(s)
	}, scheduler._get_columns_num = function (e, t) {
		var i = 7;
		if (!scheduler._table_view) {
			var a = scheduler.date["get_" + scheduler._mode + "_end"];
			a && (t = a(e)), i = Math.round((t.valueOf() - e.valueOf()) / 864e5)
		}
		return i
	}, scheduler._get_timeunit_start = function () {
		return this.date[this._mode + "_start"](new Date(this._date.valueOf()))
	}, scheduler._get_view_end = function () {
		var e = this._get_timeunit_start(), t = scheduler.date.add(e, 1, this._mode);
		if (!scheduler._table_view) {
			var i = scheduler.date["get_" + scheduler._mode + "_end"];
			i && (t = i(e))
		}
		return t
	}, scheduler._calc_scale_sizes = function (e, t, i) {
		var a = e, r = this._get_columns_num(t, i);
		this._process_ignores(t, r, "day", 1);
		for (var s = r - this._ignores_detected, n = 0; r > n; n++)this._ignores[n] ? (this._cols[n] = 0, s++) : this._cols[n] = Math.floor(a / (s - n)),
			a -= this._cols[n], this._colsS[n] = (this._cols[n - 1] || 0) + (this._colsS[n - 1] || (this._table_view ? 0 : this.xy.scale_width + 2));
		this._colsS.col_length = r, this._colsS[r] = this._cols[r - 1] + this._colsS[r - 1] || 0
	}, scheduler._set_scale_col_size = function (e, t, i) {
		var a = this.config;
		this.set_xy(e, t - 1, a.hour_size_px * (a.last_hour - a.first_hour), i + this.xy.scale_width + 1, 0)
	}, scheduler._render_scales = function (e, t) {
		var i = new Date(scheduler._min_date), a = new Date(scheduler._max_date), r = this.date.date_part(scheduler._currentDate()), s = parseInt(e.style.width, 10), n = new Date(this._min_date), d = this._get_columns_num(i, a);
		this._calc_scale_sizes(s, i, a);
		var l = 0;
		e.innerHTML = "";
		for (var o = 0; d > o; o++) {
			if (this._ignores[o] || this._render_x_header(o, l, n, e), !this._table_view) {
				var h = document.createElement("DIV"), _ = "dhx_scale_holder";
				n.valueOf() == r.valueOf() && (_ = "dhx_scale_holder_now"), this._ignores_detected && this._ignores[o] && (_ += " dhx_scale_ignore"), h.className = _ + " " + this.templates.week_date_class(n, r), this._waiAria.dayColumnAttr(h, n), this._set_scale_col_size(h, this._cols[o], l), t.appendChild(h), this.callEvent("onScaleAdd", [h, n]);
			}
			l += this._cols[o], n = this.date.add(n, 1, "day"), n = this.date.day_start(n)
		}
	}, scheduler._reset_scale = function () {
		if (this.templates[this._mode + "_date"]) {
			var e = this._els.dhx_cal_header[0], t = this._els.dhx_cal_data[0], i = this.config;
			e.innerHTML = "", t.innerHTML = "";
			var a = (i.readonly || !i.drag_resize ? " dhx_resize_denied" : "") + (i.readonly || !i.drag_move ? " dhx_move_denied" : "");
			t.className = "dhx_cal_data" + a, this._scales = {}, this._cols = [], this._colsS = {height: 0}, this._dy_shift = 0, this.set_sizes();
			var r, s, n = this._get_timeunit_start(), d = scheduler._get_view_end();
			r = s = this._table_view ? scheduler.date.week_start(n) : n, this._min_date = r;
			var l = this.templates[this._mode + "_date"](n, d, this._mode);
			if (this._els.dhx_cal_date[0].innerHTML = l, this._waiAria.navBarDateAttr(this._els.dhx_cal_date[0], l), this._max_date = d, scheduler._render_scales(e, t), this._table_view) this._reset_month_scale(t, n, s); else if (this._reset_hours_scale(t, n, s), i.multi_day) {
				var o = "dhx_multi_day";
				this._els[o] && (this._els[o][0].parentNode.removeChild(this._els[o][0]), this._els[o] = null);
				var h = this._els.dhx_cal_navline[0], _ = h.offsetHeight + this._els.dhx_cal_header[0].offsetHeight + 1, c = document.createElement("DIV");
				c.className = o, c.style.visibility = "hidden", this.set_xy(c, Math.max(this._colsS[this._colsS.col_length] + this.xy.scroll_width - 2, 0), 0, 0, _), t.parentNode.insertBefore(c, t);
				var u = c.cloneNode(!0);
				u.className = o + "_icon", u.style.visibility = "hidden", this.set_xy(u, this.xy.scale_width, 0, 0, _), c.appendChild(u), this._els[o] = [c, u], this._els[o][0].onclick = this._click.dhx_cal_data
			}
		}
	}, scheduler._reset_hours_scale = function (e, t, i) {
		var a = document.createElement("DIV");
		a.className = "dhx_scale_holder";
		for (var r = new Date(1980, 1, 1, this.config.first_hour, 0, 0), s = 1 * this.config.first_hour; s < this.config.last_hour; s++) {
			var n = document.createElement("DIV");
			n.className = "dhx_scale_hour", n.style.height = this.config.hour_size_px + "px";
			var d = this.xy.scale_width;
			this.config.left_border && (n.className += " dhx_scale_hour_border"), n.style.width = d + "px";
			var l = scheduler.templates.hour_scale(r);
			n.innerHTML = l, this._waiAria.hourScaleAttr(n, l), a.appendChild(n), r = this.date.add(r, 1, "hour")
		}
		e.appendChild(a), this.config.scroll_hour && (e.scrollTop = this.config.hour_size_px * (this.config.scroll_hour - this.config.first_hour))
	}, scheduler._currentDate = function () {
		return scheduler.config.now_date ? new Date(scheduler.config.now_date) : new Date
	}, scheduler._reset_ignores = function () {
		this._ignores = {}, this._ignores_detected = 0
	}, scheduler._process_ignores = function (e, t, i, a, r) {
		this._reset_ignores();
		var s = scheduler["ignore_" + this._mode];
		if (s)for (var n = new Date(e), d = 0; t > d; d++)s(n) && (this._ignores_detected += 1, this._ignores[d] = !0, r && t++), n = scheduler.date.add(n, a, i), scheduler.date[i + "_start"] && (n = scheduler.date[i + "_start"](n))
	}, scheduler._render_month_scale = function (e, t, i, a) {
		function r(e) {
			var t = scheduler._colsS.height;
			return void 0 !== scheduler._colsS.heights[e + 1] && (t = scheduler._colsS.heights[e + 1] - (scheduler._colsS.heights[e] || 0)), t
		}

		var s = scheduler.date.add(t, 1, "month"), n = new Date(i), d = scheduler._currentDate();
		this.date.date_part(d), this.date.date_part(i), a = a || Math.ceil(Math.round((s.valueOf() - i.valueOf()) / 864e5) / 7);
		for (var l = [], o = 0; 7 >= o; o++) {
			var h = (this._cols[o] || 0) - 1;
			0 === o && this.config.left_border && (h -= 1), l[o] = h + "px"
		}
		var _ = 0, c = document.createElement("table");
		c.setAttribute("cellpadding", "0"),
			c.setAttribute("cellspacing", "0");
		var u = document.createElement("tbody");
		c.appendChild(u);
		for (var g = [], o = 0; a > o; o++) {
			var v = document.createElement("tr");
			u.appendChild(v);
			for (var f = Math.max(r(o) - scheduler.xy.month_head_height, 0), m = 0; 7 > m; m++) {
				var p = document.createElement("td");
				v.appendChild(p);
				var b = "";
				t > i ? b = "dhx_before" : i >= s ? b = "dhx_after" : i.valueOf() == d.valueOf() && (b = "dhx_now"), this._ignores_detected && this._ignores[m] && (b += " dhx_scale_ignore"), p.className = b + " " + this.templates.month_date_class(i, d);
				var x = "dhx_month_body", y = "dhx_month_head";
				if (0 === m && this.config.left_border && (x += " dhx_month_body_border", y += " dhx_month_head_border"), this._ignores_detected && this._ignores[m]) p.appendChild(document.createElement("div")), p.appendChild(document.createElement("div")); else {
					this._waiAria.monthCellAttr(p, i);
					var w = document.createElement("DIV");
					w.className = y, w.innerHTML = this.templates.month_day(i), p.appendChild(w);
					var D = document.createElement("DIV");
					D.className = x, D.style.height = f + "px", D.style.width = l[m], p.appendChild(D)
				}
				g.push(i);
				var E = i.getDate();
				i = this.date.add(i, 1, "day"), i.getDate() - E > 1 && (i = new Date(i.getFullYear(), i.getMonth(), E + 1, 12, 0))
			}
			scheduler._colsS.heights[o] = _, _ += r(o)
		}
		this._min_date = n, this._max_date = i, e.innerHTML = "", e.appendChild(c), this._scales = {};
		for (var A = e.getElementsByTagName("div"), o = 0; o < g.length; o++) {
			var e = A[2 * o + 1], k = g[o];
			this._scales[+k] = e
		}
		for (var o = 0; o < g.length; o++) {
			var k = g[o];
			this.callEvent("onScaleAdd", [this._scales[+k], k])
		}
		return this._max_date
	}, scheduler._reset_month_scale = function (e, t, i, a) {
		var r = scheduler.date.add(t, 1, "month"), s = scheduler._currentDate();
		this.date.date_part(s), this.date.date_part(i), a = a || Math.ceil(Math.round((r.valueOf() - i.valueOf()) / 864e5) / 7);
		var n = Math.floor(e.clientHeight / a) - this.xy.month_head_height;
		return this._colsS.height = n + this.xy.month_head_height, this._colsS.heights = [], scheduler._render_month_scale(e, t, i, a)
	}, scheduler.getLabel = function (e, t) {
		for (var i = this.config.lightbox.sections, a = 0; a < i.length; a++)if (i[a].map_to == e)for (var r = i[a].options, s = 0; s < r.length; s++)if (r[s].key == t)return r[s].label;
		return ""
	}, scheduler.updateCollection = function (e, t) {
		var i = scheduler.serverList(e);
		return i ? (i.splice(0, i.length), i.push.apply(i, t || []), scheduler.callEvent("onOptionsLoad", []), scheduler.resetLightbox(), !0) : !1
	}, scheduler._lame_clone = function (e, t) {
		var i, a, r;
		for (t = t || [], i = 0; i < t.length; i += 2)if (e === t[i])return t[i + 1];
		if (e && "object" == typeof e) {
			for (r = {}, a = [Array, Date, Number, String, Boolean], i = 0; i < a.length; i++)e instanceof a[i] && (r = i ? new a[i](e) : new a[i]);
			t.push(e, r);
			for (i in e)Object.prototype.hasOwnProperty.apply(e, [i]) && (r[i] = scheduler._lame_clone(e[i], t));
		}
		return r || e
	}, scheduler._lame_copy = function (e, t) {
		for (var i in t)t.hasOwnProperty(i) && (e[i] = t[i]);
		return e
	}, scheduler._get_date_from_pos = function (e) {
		var t = this._min_date.valueOf() + 6e4 * (e.y * this.config.time_step + 24 * (this._table_view ? 0 : e.x) * 60);
		return new Date(this._correct_shift(t))
	}, scheduler.getActionData = function (e) {
		var t = this._mouse_coords(e);
		return {date: this._get_date_from_pos(t), section: t.section}
	}, scheduler._focus = function (e, t) {
		e && e.focus && (this.config.touch ? window.setTimeout(function () {
				e.focus();
			}, 10) : (t && e.select && e.select(), e.focus()))
	}, scheduler._get_real_event_length = function (e, t, i) {
		var a, r = t - e, s = i._start_correction + i._end_correction || 0, n = this["ignore_" + this._mode], d = 0;
		i.render ? (d = this._get_date_index(i, e), a = this._get_date_index(i, t)) : a = Math.round(r / 60 / 60 / 1e3 / 24);
		for (var l = !0; a > d;) {
			var o = scheduler.date.add(t, -i.x_step, i.x_unit);
			n && n(t) && (!l || l && n(o)) ? r -= t - o : (l = !1, r -= s), t = o, a--
		}
		return r
	}, scheduler._get_fictional_event_length = function (e, t, i, a) {
		var r = new Date(e), s = a ? -1 : 1;
		if (i._start_correction || i._end_correction) {
			var n;
			n = a ? 60 * r.getHours() + r.getMinutes() - 60 * (i.first_hour || 0) : 60 * (i.last_hour || 0) - (60 * r.getHours() + r.getMinutes());
			var d = 60 * (i.last_hour - i.first_hour), l = Math.ceil((t / 6e4 - n) / d);
			0 > l && (l = 0), t += l * (1440 - d) * 60 * 1e3
		}
		var o, h = new Date(1 * e + t * s), _ = this["ignore_" + this._mode], c = 0;
		for (i.render ? (c = this._get_date_index(i, r), o = this._get_date_index(i, h)) : o = Math.round(t / 60 / 60 / 1e3 / 24); o * s >= c * s;) {
			var u = scheduler.date.add(r, i.x_step * s, i.x_unit);
			_ && _(r) && (t += (u - r) * s, o += s), r = u, c += s
		}
		return t
	}, scheduler._get_section_view = function () {
		return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode] : this._props && this._props[this._mode] ? this._props[this._mode] : null
	}, scheduler._get_section_property = function () {
		return this.matrix && this.matrix[this._mode] ? this.matrix[this._mode].y_property : this._props && this._props[this._mode] ? this._props[this._mode].map_to : null
	}, scheduler._is_initialized = function () {
		var e = this.getState();
		return this._obj && e.date && e.mode
	}, scheduler._is_lightbox_open = function () {
		var e = this.getState();
		return null !== e.lightbox_id && void 0 !== e.lightbox_id;
	}, scheduler._getClassName = function (e) {
		if (!e)return "";
		var t = e.className || "";
		return t.baseVal && (t = t.baseVal), t.indexOf || (t = ""), t || ""
	}, scheduler.event = window.dhtmlxEvent, scheduler.eventRemove = function (e, t, i) {
		e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent && e.detachEvent("on" + t, i)
	}, function () {
		function e(e) {
			var t = !1, i = !1;
			if (window.getComputedStyle) {
				var a = window.getComputedStyle(e, null);
				t = a.display, i = a.visibility
			} else e.currentStyle && (t = e.currentStyle.display, i = e.currentStyle.visibility);
			var r = !1, s = scheduler._locate_css({target: e}, "dhx_form_repeat", !1);
			return s && (r = !("0px" != s.style.height)), r = r || !e.offsetHeight, "none" != t && "hidden" != i && !r
		}

		function t(e) {
			return !isNaN(e.getAttribute("tabindex")) && 1 * e.getAttribute("tabindex") >= 0
		}

		function i(e) {
			var t = {a: !0, area: !0};
			return t[e.nodeName.loLowerCase()] ? !!e.getAttribute("href") : !0
		}

		function a(e) {
			var t = {input: !0, select: !0, textarea: !0, button: !0, object: !0};
			return t[e.nodeName.toLowerCase()] ? !e.hasAttribute("disabled") : !0
		}

		scheduler._getFocusableNodes = function (r) {
			for (var s = r.querySelectorAll(["a[href]", "area[href]", "input", "select", "textarea", "button", "iframe", "object", "embed", "[tabindex]", "[contenteditable]"].join(", ")), n = Array.prototype.slice.call(s, 0), d = 0; d < n.length; d++) {
				var l = n[d], o = (t(l) || a(l) || i(l)) && e(l);
				o || (n.splice(d, 1), d--)
			}
			return n
		}
	}(), scheduler._trim = function (e) {
		var t = String.prototype.trim || function () {
				return this.replace(/^\s+|\s+$/g, "")
			};
		return t.apply(e)
	}, function () {
		function e(e) {
			return (e + "").replace(a, " ").replace(r, " ")
		}

		function t(e) {
			return (e + "").replace(s, "&#39;");
		}

		function i() {
			return !scheduler.config.wai_aria_attributes
		}

		var a = new RegExp("<(?:.|\n)*?>", "gm"), r = new RegExp(" +", "gm"), s = new RegExp("'", "gm");
		scheduler._waiAria = {
			getAttributeString: function (i) {
				var a = [" "];
				for (var r in i)if ("function" != typeof i[r] && "object" != typeof i[r]) {
					var s = t(e(i[r]));
					a.push(r + "='" + s + "'")
				}
				return a.push(" "), a.join(" ")
			}, setAttributes: function (t, i) {
				for (var a in i)t.setAttribute(a, e(i[a]));
				return t
			}, labelAttr: function (e, t) {
				return this.setAttributes(e, {"aria-label": t})
			}, label: function (e) {
				return scheduler._waiAria.getAttributeString({"aria-label": e})
			}, hourScaleAttr: function (e, t) {
				this.labelAttr(e, t)
			}, monthCellAttr: function (e, t) {
				this.labelAttr(e, scheduler.templates.day_date(t))
			}, navBarDateAttr: function (e, t) {
				this.labelAttr(e, t)
			}, dayHeaderAttr: function (e, t) {
				this.labelAttr(e, t)
			}, dayColumnAttr: function (e, t) {
				this.dayHeaderAttr(e, scheduler.templates.day_date(t))
			}, headerButtonsAttributes: function (e, t) {
				return this.setAttributes(e, {role: "button", "aria-label": t})
			}, headerToggleState: function (e, t) {
				return this.setAttributes(e, {"aria-pressed": t ? "true" : "false"})
			}, getHeaderCellAttr: function (e) {
				return scheduler._waiAria.getAttributeString({"aria-label": e})
			}, eventAttr: function (e, t) {
				!scheduler.config.readonly && scheduler.config.drag_move && (e.id != scheduler.getState().drag_id ? t.setAttribute("aria-grabbed", !1) : t.setAttribute("aria-grabbed", !0)), this._eventCommonAttr(e, t)
			}, _eventCommonAttr: function (t, i) {
				i.setAttribute("aria-label", e(scheduler.templates.tooltip_text(t.start_date, t.end_date, t))), scheduler.config.readonly && i.setAttribute("aria-readonly", !0),
				t.$dataprocessor_class && i.setAttribute("aria-busy", !0), i.setAttribute("aria-selected", scheduler.getState().select_id == t.id ? "true" : "false")
			}, setEventBarAttr: function (e, t) {
				this._eventCommonAttr(e, t), !scheduler.config.readonly && scheduler.config.drag_move && (e.id != scheduler.getState().drag_id ? t.setAttribute("aria-grabbed", !1) : t.setAttribute("aria-grabbed", !0))
			}, _getAttributes: function (e, t) {
				var i = {
					setAttribute: function (e, t) {
						this[e] = t
					}
				};
				return e.apply(this, [t, i]), i
			}, eventBarAttrString: function (e) {
				return this.getAttributeString(this._getAttributes(this.setEventBarAttr, e));
			}, agendaHeadAttrString: function () {
				return this.getAttributeString({role: "row"})
			}, agendaHeadDateString: function (e) {
				return this.getAttributeString({role: "columnheader", "aria-label": e})
			}, agendaHeadDescriptionString: function (e) {
				return this.agendaHeadDateString(e)
			}, agendaDataAttrString: function () {
				return this.getAttributeString({role: "grid"})
			}, agendaEventAttrString: function (e) {
				var t = this._getAttributes(this._eventCommonAttr, e);
				return t.role = "row", this.getAttributeString(t)
			}, agendaDetailsBtnString: function () {
				return this.getAttributeString({role: "button", "aria-label": scheduler.locale.labels.icon_details})
			}, gridAttrString: function () {
				return this.getAttributeString({role: "grid"})
			}, gridRowAttrString: function (e) {
				return this.agendaEventAttrString(e)
			}, gridCellAttrString: function (e, t, i) {
				return this.getAttributeString({
					role: "gridcell",
					"aria-label": [void 0 === t.label ? t.id : t.label, ": ", i]
				})
			}, mapAttrString: function () {
				return this.gridAttrString()
			}, mapRowAttrString: function (e) {
				return this.gridRowAttrString(e)
			}, mapDetailsBtnString: function () {
				return this.agendaDetailsBtnString()
			}, minicalHeader: function (e, t) {
				this.setAttributes(e, {id: t + "", "aria-live": "assertice", "aria-atomic": "true"})
			}, minicalGrid: function (e, t) {
				this.setAttributes(e, {"aria-labelledby": t + "", role: "grid"})
			}, minicalRow: function (e) {
				this.setAttributes(e, {role: "row"})
			}, minicalDayCell: function (e, t) {
				var i = t.valueOf() < scheduler._max_date.valueOf() && t.valueOf() >= scheduler._min_date.valueOf();
				this.setAttributes(e, {
					role: "gridcell",
					"aria-label": scheduler.templates.day_date(t),
					"aria-selected": i ? "true" : "false"
				})
			}, minicalHeadCell: function (e) {
				this.setAttributes(e, {role: "columnheader"})
			}, weekAgendaDayCell: function (e, t) {
				var i = e.querySelector(".dhx_wa_scale_bar"), a = e.querySelector(".dhx_wa_day_data"), r = scheduler.uid() + "";
				this.setAttributes(i, {id: r}), this.setAttributes(a, {"aria-labelledby": r})
			}, weekAgendaEvent: function (e, t) {
				this.eventAttr(t, e)
			}, lightboxHiddenAttr: function (e) {
				e.setAttribute("aria-hidden", "true")
			}, lightboxVisibleAttr: function (e) {
				e.setAttribute("aria-hidden", "false")
			}, lightboxSectionButtonAttrString: function (e) {
				return this.getAttributeString({role: "button", "aria-label": e, tabindex: "0"})
			}, yearHeader: function (e, t) {
				this.setAttributes(e, {id: t + ""})
			}, yearGrid: function (e, t) {
				this.minicalGrid(e, t)
			}, yearHeadCell: function (e) {
				return this.minicalHeadCell(e)
			}, yearRow: function (e) {
				return this.minicalRow(e)
			}, yearDayCell: function (e) {
				this.setAttributes(e, {role: "gridcell"})
			}, lightboxAttr: function (e) {
				e.setAttribute("role", "dialog"), e.setAttribute("aria-hidden", "true"), e.firstChild.setAttribute("role", "heading")
			}, lightboxButtonAttrString: function (e) {
				return this.getAttributeString({
					role: "button",
					"aria-label": scheduler.locale.labels[e],
					tabindex: "0"
				})
			}, eventMenuAttrString: function (e) {
				return this.getAttributeString({role: "button", "aria-label": scheduler.locale.labels[e]})
			}, lightboxHeader: function (e, t) {
				e.setAttribute("aria-label", t)
			}, lightboxSelectAttrString: function (e) {
				var t = "";
				switch (e) {
					case"%Y":
						t = scheduler.locale.labels.year;
						break;
					case"%m":
						t = scheduler.locale.labels.month;
						break;
					case"%d":
						t = scheduler.locale.labels.day;
						break;
					case"%H:%i":
						t = scheduler.locale.labels.hour + " " + scheduler.locale.labels.minute;
				}
				return scheduler._waiAria.getAttributeString({"aria-label": t})
			}, messageButtonAttrString: function (e) {
				return "tabindex='0' role='button' aria-label='" + e + "'"
			}, messageInfoAttr: function (e) {
				e.setAttribute("role", "alert")
			}, messageModalAttr: function (e, t) {
				e.setAttribute("role", "dialog"), t && e.setAttribute("aria-labelledby", t)
			}, quickInfoAttr: function (e) {
				e.setAttribute("role", "dialog")
			}, quickInfoHeaderAttrString: function () {
				return " role='heading' "
			}, quickInfoHeader: function (e, t) {
				e.setAttribute("aria-label", t);
			}, quickInfoButtonAttrString: function (e) {
				return scheduler._waiAria.getAttributeString({role: "button", "aria-label": e, tabindex: "0"})
			}, tooltipAttr: function (e) {
				e.setAttribute("role", "tooltip")
			}, tooltipVisibleAttr: function (e) {
				e.setAttribute("aria-hidden", "false")
			}, tooltipHiddenAttr: function (e) {
				e.setAttribute("aria-hidden", "true")
			}
		};
		for (var n in scheduler._waiAria)scheduler._waiAria[n] = function (e) {
			return function () {
				return i() ? "" : e.apply(this, arguments)
			}
		}(scheduler._waiAria[n])
	}(), scheduler.date = {
		init: function () {
			for (var e = scheduler.locale.date.month_short, t = scheduler.locale.date.month_short_hash = {}, i = 0; i < e.length; i++)t[e[i]] = i;
			for (var e = scheduler.locale.date.month_full, t = scheduler.locale.date.month_full_hash = {}, i = 0; i < e.length; i++)t[e[i]] = i
		}, _bind_host_object: function (e) {
			return e.bind ? e.bind(scheduler) : function () {
					return e.apply(scheduler, arguments)
				}
		}, date_part: function (e) {
			var t = new Date(e);
			return e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), e.getHours() && (e.getDate() < t.getDate() || e.getMonth() < t.getMonth() || e.getFullYear() < t.getFullYear()) && e.setTime(e.getTime() + 36e5 * (24 - e.getHours())),
				e
		}, time_part: function (e) {
			return (e.valueOf() / 1e3 - 60 * e.getTimezoneOffset()) % 86400
		}, week_start: function (e) {
			var t = e.getDay();
			return scheduler.config.start_on_monday && (0 === t ? t = 6 : t--), this.date_part(this.add(e, -1 * t, "day"))
		}, month_start: function (e) {
			return e.setDate(1), this.date_part(e)
		}, year_start: function (e) {
			return e.setMonth(0), this.month_start(e)
		}, day_start: function (e) {
			return this.date_part(e)
		}, _add_days: function (e, t) {
			var i = new Date(e.valueOf());
			if (i.setDate(i.getDate() + t), t == Math.round(t) && t > 0) {
				var a = +i - +e, r = a % 864e5;
				if (r && e.getTimezoneOffset() == i.getTimezoneOffset()) {
					var s = r / 36e5;
					i.setTime(i.getTime() + 60 * (24 - s) * 60 * 1e3)
				}
			}
			return t >= 0 && !e.getHours() && i.getHours() && (i.getDate() < e.getDate() || i.getMonth() < e.getMonth() || i.getFullYear() < e.getFullYear()) && i.setTime(i.getTime() + 36e5 * (24 - i.getHours())), i
		}, add: function (e, t, i) {
			var a = new Date(e.valueOf());
			switch (i) {
				case"day":
					a = scheduler.date._add_days(a, t);
					break;
				case"week":
					a = scheduler.date._add_days(a, 7 * t);
					break;
				case"month":
					a.setMonth(a.getMonth() + t);
					break;
				case"year":
					a.setYear(a.getFullYear() + t);
					break;
				case"hour":
					a.setTime(a.getTime() + 60 * t * 60 * 1e3);
					break;
				case"minute":
					a.setTime(a.getTime() + 60 * t * 1e3);
					break;
				default:
					return scheduler.date["add_" + i](e, t, i)
			}
			return a
		}, to_fixed: function (e) {
			return 10 > e ? "0" + e : e
		}, copy: function (e) {
			return new Date(e.valueOf())
		}, date_to_str: function (e, t) {
			e = e.replace(/%[a-zA-Z]/g, function (e) {
				switch (e) {
					case"%d":
						return '"+this.date.to_fixed(date.getDate())+"';
					case"%m":
						return '"+this.date.to_fixed((date.getMonth()+1))+"';
					case"%j":
						return '"+date.getDate()+"';
					case"%n":
						return '"+(date.getMonth()+1)+"';
					case"%y":
						return '"+this.date.to_fixed(date.getFullYear()%100)+"';
					case"%Y":
						return '"+date.getFullYear()+"';
					case"%D":
						return '"+this.locale.date.day_short[date.getDay()]+"';
					case"%l":
						return '"+this.locale.date.day_full[date.getDay()]+"';
					case"%M":
						return '"+this.locale.date.month_short[date.getMonth()]+"';
					case"%F":
						return '"+this.locale.date.month_full[date.getMonth()]+"';
					case"%h":
						return '"+this.date.to_fixed((date.getHours()+11)%12+1)+"';
					case"%g":
						return '"+((date.getHours()+11)%12+1)+"';
					case"%G":
						return '"+date.getHours()+"';
					case"%H":
						return '"+this.date.to_fixed(date.getHours())+"';
					case"%i":
						return '"+this.date.to_fixed(date.getMinutes())+"';
					case"%a":
						return '"+(date.getHours()>11?"pm":"am")+"';
					case"%A":
						return '"+(date.getHours()>11?"PM":"AM")+"';
					case"%s":
						return '"+this.date.to_fixed(date.getSeconds())+"';
					case"%W":
						return '"+this.date.to_fixed(this.date.getISOWeek(date))+"';
					default:
						return e
				}
			}), t && (e = e.replace(/date\.get/g, "date.getUTC"));
			var i = new Function("date", 'return "' + e + '";');
			return scheduler.date._bind_host_object(i)
		},
		str_to_date: function (e, t) {
			for (var i = "var temp=date.match(/[a-zA-Z]+|[0-9]+/g);", a = e.match(/%[a-zA-Z]/g), r = 0; r < a.length; r++)switch (a[r]) {
				case"%j":
				case"%d":
					i += "set[2]=temp[" + r + "]||1;";
					break;
				case"%n":
				case"%m":
					i += "set[1]=(temp[" + r + "]||1)-1;";
					break;
				case"%y":
					i += "set[0]=temp[" + r + "]*1+(temp[" + r + "]>50?1900:2000);";
					break;
				case"%g":
				case"%G":
				case"%h":
				case"%H":
					i += "set[3]=temp[" + r + "]||0;";
					break;
				case"%i":
					i += "set[4]=temp[" + r + "]||0;";
					break;
				case"%Y":
					i += "set[0]=temp[" + r + "]||0;";
					break;
				case"%a":
				case"%A":
					i += "set[3]=set[3]%12+((temp[" + r + "]||'').toLowerCase()=='am'?0:12);";
					break;
				case"%s":
					i += "set[5]=temp[" + r + "]||0;";
					break;
				case"%M":
					i += "set[1]=this.locale.date.month_short_hash[temp[" + r + "]]||0;";
					break;
				case"%F":
					i += "set[1]=this.locale.date.month_full_hash[temp[" + r + "]]||0;"
			}
			var s = "set[0],set[1],set[2],set[3],set[4],set[5]";
			t && (s = " Date.UTC(" + s + ")");
			var n = new Function("date", "var set=[0,0,1,0,0,0]; " + i + " return new Date(" + s + ");");
			return scheduler.date._bind_host_object(n)
		}, getISOWeek: function (e) {
			if (!e)return !1;
			e = this.date_part(new Date(e));
			var t = e.getDay();
			0 === t && (t = 7);
			var i = new Date(e.valueOf());
			i.setDate(e.getDate() + (4 - t));
			var a = i.getFullYear(), r = Math.round((i.getTime() - new Date(a, 0, 1).getTime()) / 864e5), s = 1 + Math.floor(r / 7);
			return s
		}, getUTCISOWeek: function (e) {
			return this.getISOWeek(this.convert_to_utc(e))
		}, convert_to_utc: function (e) {
			return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds())
		}
	}, scheduler.locale = {
		date: {
			month_full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			month_short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			day_full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			day_short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		}, labels: {
			dhx_cal_today_button: "Today",
			day_tab: "Day",
			week_tab: "Week",
			month_tab: "Month",
			new_event: "New event",
			icon_save: "Save",
			icon_cancel: "Cancel",
			icon_details: "Details",
			icon_edit: "Edit",
			icon_delete: "Delete",
			confirm_closing: "",
			confirm_deleting: "Event will be deleted permanently, are you sure?",
			section_description: "Description",
			section_time: "Time period",
			full_day: "Full day",
			confirm_recurring: "Do you want to edit the whole set of repeated events?",
			section_recurring: "Repeat event",
			button_recurring: "Disabled",
			button_recurring_open: "Enabled",
			button_edit_series: "Edit series",
			button_edit_occurrence: "Edit occurrence",
			agenda_tab: "Agenda",
			date: "Date",
			description: "Description",
			year_tab: "Year",
			week_agenda_tab: "Agenda",
			grid_tab: "Grid",
			drag_to_create: "Drag to create",
			drag_to_move: "Drag to move",
			message_ok: "OK",
			message_cancel: "Cancel",
			next: "Next",
			prev: "Previous",
			year: "Year",
			month: "Month",
			day: "Day",
			hour: "Hour",
			minute: "Minute"
		}
	}, scheduler.config = {
		default_date: "%j %M %Y",
		month_date: "%F %Y",
		load_date: "%Y-%m-%d",
		week_date: "%l",
		day_date: "%D, %F %j",
		hour_date: "%H:%i",
		month_day: "%d",
		xml_date: "%m/%d/%Y %H:%i",
		api_date: "%d-%m-%Y %H:%i",
		preserve_length: !0,
		time_step: 5,
		start_on_monday: 1,
		first_hour: 0,
		last_hour: 24,
		readonly: !1,
		drag_resize: 1,
		drag_move: 1,
		drag_create: 1,
		dblclick_create: 1,
		edit_on_create: 1,
		details_on_create: 0,
		resize_month_events: !1,
		resize_month_timed: !1,
		cascade_event_display: !1,
		cascade_event_count: 4,
		cascade_event_margin: 30,
		multi_day: !0,
		multi_day_height_limit: 0,
		drag_lightbox: !0,
		preserve_scroll: !0,
		select: !0,
		server_utc: !1,
		touch: !0,
		touch_tip: !0,
		touch_drag: 500,
		quick_info_detached: !0,
		positive_closing: !1,
		drag_highlight: !0,
		limit_drag_out: !1,
		icons_edit: ["icon_save", "icon_cancel"],
		icons_select: ["icon_details", "icon_edit", "icon_delete"],
		buttons_left: ["dhx_save_btn", "dhx_cancel_btn"],
		buttons_right: ["dhx_delete_btn"],
		lightbox: {
			sections: [{
				name: "description",
				height: 200,
				map_to: "text",
				type: "textarea",
				focus: !0
			}, {name: "time", height: 72, type: "time", map_to: "auto"}]
		},
		highlight_displayed_event: !0,
		left_border: !1,
		ajax_error: "alert",
		delay_render: 0,
		timeline_swap_resize: !0,
		wai_aria_attributes: !0
	}, scheduler.templates = {}, scheduler.init_templates = function () {
		var e = scheduler.locale.labels;
		e.dhx_save_btn = e.icon_save, e.dhx_cancel_btn = e.icon_cancel, e.dhx_delete_btn = e.icon_delete;
		var t = scheduler.date.date_to_str, i = scheduler.config, a = function (e, t) {
			for (var i in t)e[i] || (e[i] = t[i])
		};
		a(scheduler.templates, {
			day_date: t(i.default_date),
			month_date: t(i.month_date),
			week_date: function (e, t) {
				return scheduler.templates.day_date(e) + " &ndash; " + scheduler.templates.day_date(scheduler.date.add(t, -1, "day"))
			},
			day_scale_date: t(i.default_date),
			month_scale_date: t(i.week_date),
			week_scale_date: t(i.day_date),
			hour_scale: t(i.hour_date),
			time_picker: t(i.hour_date),
			event_date: t(i.hour_date),
			month_day: t(i.month_day),
			xml_date: scheduler.date.str_to_date(i.xml_date, i.server_utc),
			load_format: t(i.load_date, i.server_utc),
			xml_format: t(i.xml_date, i.server_utc),
			api_date: scheduler.date.str_to_date(i.api_date),
			event_header: function (e, t, i) {
				return scheduler.templates.event_date(e) + " - " + scheduler.templates.event_date(t)
			},
			event_text: function (e, t, i) {
				return i.text
			},
			event_class: function (e, t, i) {
				return ""
			},
			month_date_class: function (e) {
				return ""
			},
			week_date_class: function (e) {
				return ""
			},
			event_bar_date: function (e, t, i) {
				return scheduler.templates.event_date(e) + " "
			},
			event_bar_text: function (e, t, i) {
				return i.text
			},
			month_events_link: function (e, t) {
				return "<a>View more(" + t + " events)</a>"
			},
			drag_marker_class: function (e, t, i) {
				return ""
			},
			drag_marker_content: function (e, t, i) {
				return ""
			}
		}), this.callEvent("onTemplatesReady", [])
	}, scheduler.templates.tooltip_date_format = scheduler.date.date_to_str("%Y-%m-%d %H:%i"), scheduler.templates.tooltip_text = function (e, t, i) {
		return "<b>Event:</b> " + i.text + "<br/><b>Start date:</b> " + scheduler.templates.tooltip_date_format(e) + "<br/><b>End date:</b> " + scheduler.templates.tooltip_date_format(t);
	}, scheduler.uid = function () {
		return this._seed || (this._seed = (new Date).valueOf()), this._seed++
	}, scheduler._events = {}, scheduler.clearAll = function () {
		this._events = {}, this._loaded = {}, this._edit_id = null, this._select_id = null, this._drag_id = null, this._drag_mode = null, this._drag_pos = null, this.clear_view(), this.callEvent("onClearAll", [])
	}, scheduler.addEvent = function (e, t, i, a, r) {
		if (!arguments.length)return this.addEventNow();
		var s = e;
		1 != arguments.length && (s = r || {}, s.start_date = e, s.end_date = t, s.text = i, s.id = a), s.id = s.id || scheduler.uid(),
			s.text = s.text || "", "string" == typeof s.start_date && (s.start_date = this.templates.api_date(s.start_date)), "string" == typeof s.end_date && (s.end_date = this.templates.api_date(s.end_date));
		var n = 6e4 * (this.config.event_duration || this.config.time_step);
		s.start_date.valueOf() == s.end_date.valueOf() && s.end_date.setTime(s.end_date.valueOf() + n), s._timed = this.isOneDayEvent(s);
		var d = !this._events[s.id];
		return this._events[s.id] = s, this.event_updated(s), this._loading || this.callEvent(d ? "onEventAdded" : "onEventChanged", [s.id, s]),
			s.id
	}, scheduler.deleteEvent = function (e, t) {
		var i = this._events[e];
		(t || this.callEvent("onBeforeEventDelete", [e, i]) && this.callEvent("onConfirmedBeforeEventDelete", [e, i])) && (i && (this._select_id = null, delete this._events[e], this.event_updated(i)), this.callEvent("onEventDeleted", [e, i]))
	}, scheduler.getEvent = function (e) {
		return this._events[e]
	}, scheduler.setEvent = function (e, t) {
		t.id || (t.id = e), this._events[e] = t
	}, scheduler.for_rendered = function (e, t) {
		for (var i = this._rendered.length - 1; i >= 0; i--)this._rendered[i].getAttribute("event_id") == e && t(this._rendered[i], i);
	}, scheduler.changeEventId = function (e, t) {
		if (e != t) {
			var i = this._events[e];
			i && (i.id = t, this._events[t] = i, delete this._events[e]), this.for_rendered(e, function (e) {
				e.setAttribute("event_id", t)
			}), this._select_id == e && (this._select_id = t), this._edit_id == e && (this._edit_id = t), this.callEvent("onEventIdChange", [e, t])
		}
	}, function () {
		for (var e = ["text", "Text", "start_date", "StartDate", "end_date", "EndDate"], t = function (e) {
			return function (t) {
				return scheduler.getEvent(t)[e]
			}
		}, i = function (e) {
			return function (t, i) {
				var a = scheduler.getEvent(t);
				a[e] = i, a._changed = !0, a._timed = this.isOneDayEvent(a), scheduler.event_updated(a, !0)
			}
		}, a = 0; a < e.length; a += 2)scheduler["getEvent" + e[a + 1]] = t(e[a]), scheduler["setEvent" + e[a + 1]] = i(e[a])
	}(), scheduler.event_updated = function (e, t) {
		this.is_visible_events(e) ? this.render_view_data() : this.clear_event(e.id)
	}, scheduler.is_visible_events = function (e) {
		var t = e.start_date.valueOf() < this._max_date.valueOf() && this._min_date.valueOf() < e.end_date.valueOf();
		if (t) {
			var i = e.start_date.getHours(), a = e.end_date.getHours() + e.end_date.getMinutes() / 60, r = this.config.last_hour, s = this.config.first_hour, n = this._table_view || !((a > r || s > a) && (i >= r || s > i));
			if (n)return !0;
			var d = (e.end_date.valueOf() - e.start_date.valueOf()) / 36e5, l = 24 - (this.config.last_hour - this.config.first_hour);
			return !!(d > l || r > i && a >= s)
		}
		return !1
	}, scheduler.isOneDayEvent = function (e) {
		var t = e.end_date.getDate() - e.start_date.getDate();
		return t ? (0 > t && (t = Math.ceil((e.end_date.valueOf() - e.start_date.valueOf()) / 864e5)), 1 == t && !e.end_date.getHours() && !e.end_date.getMinutes() && (e.start_date.getHours() || e.start_date.getMinutes())) : e.start_date.getMonth() == e.end_date.getMonth() && e.start_date.getFullYear() == e.end_date.getFullYear();
	}, scheduler.get_visible_events = function (e) {
		var t = [];
		for (var i in this._events)this.is_visible_events(this._events[i]) && (!e || this._events[i]._timed) && this.filter_event(i, this._events[i]) && t.push(this._events[i]);
		return t
	}, scheduler.filter_event = function (e, t) {
		var i = this["filter_" + this._mode];
		return i ? i(e, t) : !0
	}, scheduler._is_main_area_event = function (e) {
		return !!e._timed
	}, scheduler.render_view_data = function (e, t) {
		var i = !1;
		if (!e) {
			if (i = !0, this._not_render)return void(this._render_wait = !0);
			this._render_wait = !1,
				this.clear_view(), e = this.get_visible_events(!(this._table_view || this.config.multi_day))
		}
		for (var a = 0, r = e.length; r > a; a++)this._recalculate_timed(e[a]);
		if (this.config.multi_day && !this._table_view) {
			for (var s = [], n = [], a = 0; a < e.length; a++)this._is_main_area_event(e[a]) ? s.push(e[a]) : n.push(e[a]);
			this._rendered_location = this._els.dhx_multi_day[0], this._table_view = !0, this.render_data(n, t), this._table_view = !1, this._rendered_location = this._els.dhx_cal_data[0], this._table_view = !1, this.render_data(s, t)
		} else this._rendered_location = this._els.dhx_cal_data[0],
			this.render_data(e, t);
		i && this.callEvent("onDataRender", [])
	}, scheduler._view_month_day = function (e) {
		var t = scheduler.getActionData(e).date;
		scheduler.callEvent("onViewMoreClick", [t]) && scheduler.setCurrentView(t, "day")
	}, scheduler._render_month_link = function (e) {
		for (var t = this._rendered_location, i = this._lame_clone(e), a = e._sday; a < e._eday; a++) {
			i._sday = a, i._eday = a + 1;
			var r = scheduler.date, s = scheduler._min_date;
			s = r.add(s, i._sweek, "week"), s = r.add(s, i._sday, "day");
			var n = scheduler.getEvents(s, r.add(s, 1, "day")).length, d = this._get_event_bar_pos(i), l = d.x2 - d.x, o = document.createElement("div");
			o.onclick = function (e) {
				scheduler._view_month_day(e || event)
			}, o.className = "dhx_month_link", o.style.top = d.y + "px", o.style.left = d.x + "px", o.style.width = l + "px", o.innerHTML = scheduler.templates.month_events_link(s, n), this._rendered.push(o), t.appendChild(o)
		}
	}, scheduler._recalculate_timed = function (e) {
		if (e) {
			var t;
			t = "object" != typeof e ? this._events[e] : e, t && (t._timed = scheduler.isOneDayEvent(t))
		}
	}, scheduler.attachEvent("onEventChanged", scheduler._recalculate_timed), scheduler.attachEvent("onEventAdded", scheduler._recalculate_timed),
		scheduler.render_data = function (e, t) {
			e = this._pre_render_events(e, t);
			for (var i = 0; i < e.length; i++)if (this._table_view)if ("month" != scheduler._mode) this.render_event_bar(e[i]); else {
				var a = scheduler.config.max_month_events;
				a !== 1 * a || e[i]._sorder < a ? this.render_event_bar(e[i]) : void 0 !== a && e[i]._sorder == a && scheduler._render_month_link(e[i])
			} else this.render_event(e[i])
		}, scheduler._get_first_visible_cell = function (e) {
		for (var t = 0; t < e.length; t++)if (-1 == (e[t].className || "").indexOf("dhx_scale_ignore"))return e[t];
		return e[0]
	},scheduler._pre_render_events = function (e, t) {
		var i = this.xy.bar_height, a = this._colsS.heights, r = this._colsS.heights = [0, 0, 0, 0, 0, 0, 0], s = this._els.dhx_cal_data[0];
		if (e = this._table_view ? this._pre_render_events_table(e, t) : this._pre_render_events_line(e, t), this._table_view)if (t) this._colsS.heights = a; else {
			var n = s.firstChild;
			if (n.rows) {
				for (var d = 0; d < n.rows.length; d++) {
					r[d]++;
					var l = n.rows[d].cells, o = this._colsS.height - this.xy.month_head_height;
					if (r[d] * i > o) {
						var h = o;
						1 * this.config.max_month_events !== this.config.max_month_events || r[d] <= this.config.max_month_events ? h = r[d] * i : (this.config.max_month_events + 1) * i > o && (h = (this.config.max_month_events + 1) * i);
						for (var _ = 0; _ < l.length; _++)l[_].childNodes[1].style.height = h + "px"
					}
					r[d] = (r[d - 1] || 0) + scheduler._get_first_visible_cell(l).offsetHeight
				}
				if (r.unshift(0), n.parentNode.offsetHeight < n.parentNode.scrollHeight && !scheduler._colsS.scroll_fix && scheduler.xy.scroll_width) {
					var c = scheduler._colsS, u = c[c.col_length], g = c.heights.slice();
					u -= scheduler.xy.scroll_width || 0, this._calc_scale_sizes(u, this._min_date, this._max_date), scheduler._colsS.heights = g, this.set_xy(this._els.dhx_cal_header[0], u, this.xy.scale_height), scheduler._render_scales(this._els.dhx_cal_header[0]),
						scheduler._render_month_scale(this._els.dhx_cal_data[0], this._get_timeunit_start(), this._min_date), c.scroll_fix = !0
				}
			} else if (e.length || "visible" != this._els.dhx_multi_day[0].style.visibility || (r[0] = -1), e.length || -1 == r[0]) {
				var v = (n.parentNode.childNodes, (r[0] + 1) * i + 1), f = v, m = v + "px";
				this.config.multi_day_height_limit && (f = Math.min(v, this.config.multi_day_height_limit), m = f + "px"), s.style.top = this._els.dhx_cal_navline[0].offsetHeight + this._els.dhx_cal_header[0].offsetHeight + f + "px", s.style.height = this._obj.offsetHeight - parseInt(s.style.top, 10) - (this.xy.margin_top || 0) + "px";
				var p = this._els.dhx_multi_day[0];
				p.style.height = m, p.style.visibility = -1 == r[0] ? "hidden" : "visible";
				var b = this._els.dhx_multi_day[1];
				b.style.height = m, b.style.visibility = -1 == r[0] ? "hidden" : "visible", b.className = r[0] ? "dhx_multi_day_icon" : "dhx_multi_day_icon_small", this._dy_shift = (r[0] + 1) * i, this.config.multi_day_height_limit && (this._dy_shift = Math.min(this.config.multi_day_height_limit, this._dy_shift)), r[0] = 0, f != v && (s.style.top = parseInt(s.style.top) + 2 + "px", p.style.overflowY = "auto", b.style.position = "fixed",
					b.style.top = "", b.style.left = "")
			}
		}
		return e
	},scheduler._get_event_sday = function (e) {
		var t = this.date.day_start(new Date(e.start_date));
		return Math.round((t.valueOf() - this._min_date.valueOf()) / 864e5)
	},scheduler._get_event_mapped_end_date = function (e) {
		var t = e.end_date;
		if (this.config.separate_short_events) {
			var i = (e.end_date - e.start_date) / 6e4;
			i < this._min_mapped_duration && (t = this.date.add(t, this._min_mapped_duration - i, "minute"))
		}
		return t
	},scheduler._pre_render_events_line = function (e, t) {
		e.sort(function (e, t) {
			return e.start_date.valueOf() == t.start_date.valueOf() ? e.id > t.id ? 1 : -1 : e.start_date > t.start_date ? 1 : -1
		});
		var i = [], a = [];
		this._min_mapped_duration = Math.ceil(60 * this.xy.min_event_height / this.config.hour_size_px);
		for (var r = 0; r < e.length; r++) {
			var s = e[r], n = s.start_date, d = s.end_date, l = n.getHours(), o = d.getHours();
			if (s._sday = this._get_event_sday(s), this._ignores[s._sday]) e.splice(r, 1), r--; else {
				if (i[s._sday] || (i[s._sday] = []), !t) {
					s._inner = !1;
					for (var h = i[s._sday]; h.length;) {
						var _ = h[h.length - 1], c = this._get_event_mapped_end_date(_);
						if (!(c.valueOf() <= s.start_date.valueOf()))break;
						h.splice(h.length - 1, 1)
					}
					for (var u = h.length, g = !1, v = 0; v < h.length; v++) {
						var _ = h[v], c = this._get_event_mapped_end_date(_);
						if (c.valueOf() <= s.start_date.valueOf()) {
							g = !0, s._sorder = _._sorder, u = v, s._inner = !0;
							break
						}
					}
					if (h.length && (h[h.length - 1]._inner = !0), !g)if (h.length)if (h.length <= h[h.length - 1]._sorder) {
						if (h[h.length - 1]._sorder)for (v = 0; v < h.length; v++) {
							for (var f = !1, m = 0; m < h.length; m++)if (h[m]._sorder == v) {
								f = !0;
								break
							}
							if (!f) {
								s._sorder = v;
								break
							}
						} else s._sorder = 0;
						s._inner = !0;
					} else {
						var p = h[0]._sorder;
						for (v = 1; v < h.length; v++)h[v]._sorder > p && (p = h[v]._sorder);
						s._sorder = p + 1, s._inner = !1
					} else s._sorder = 0;
					h.splice(u, u == h.length ? 0 : 1, s), h.length > (h.max_count || 0) ? (h.max_count = h.length, s._count = h.length) : s._count = s._count ? s._count : 1
				}
				(l < this.config.first_hour || o >= this.config.last_hour) && (a.push(s), e[r] = s = this._copy_event(s), l < this.config.first_hour && (s.start_date.setHours(this.config.first_hour), s.start_date.setMinutes(0)), o >= this.config.last_hour && (s.end_date.setMinutes(0), s.end_date.setHours(this.config.last_hour)),
				s.start_date > s.end_date || l == this.config.last_hour) && (e.splice(r, 1), r--)
			}
		}
		if (!t) {
			for (var r = 0; r < e.length; r++)e[r]._count = i[e[r]._sday].max_count;
			for (var r = 0; r < a.length; r++)a[r]._count = i[a[r]._sday].max_count
		}
		return e
	},scheduler._time_order = function (e) {
		e.sort(function (e, t) {
			return e.start_date.valueOf() == t.start_date.valueOf() ? e._timed && !t._timed ? 1 : !e._timed && t._timed ? -1 : e.id > t.id ? 1 : -1 : e.start_date > t.start_date ? 1 : -1
		})
	},scheduler._pre_render_events_table = function (e, t) {
		this._time_order(e);
		for (var i, a = [], r = [[], [], [], [], [], [], []], s = this._colsS.heights, n = this._cols.length, d = {}, l = 0; l < e.length; l++) {
			var o = e[l], h = o.id;
			d[h] || (d[h] = {first_chunk: !0, last_chunk: !0});
			var _ = d[h], c = i || o.start_date, u = o.end_date;
			c < this._min_date && (_.first_chunk = !1, c = this._min_date), u > this._max_date && (_.last_chunk = !1, u = this._max_date);
			var g = this.locate_holder_day(c, !1, o);
			if (o._sday = g % n, !this._ignores[o._sday] || !o._timed) {
				var v = this.locate_holder_day(u, !0, o) || n;
				o._eday = v % n || n, o._length = v - g, o._sweek = Math.floor((this._correct_shift(c.valueOf(), 1) - this._min_date.valueOf()) / (864e5 * n));
				var f, m = r[o._sweek];
				for (f = 0; f < m.length && !(m[f]._eday <= o._sday); f++);
				if (o._sorder && t || (o._sorder = f), o._sday + o._length <= n) i = null, a.push(o), m[f] = o, s[o._sweek] = m.length - 1, o._first_chunk = _.first_chunk, o._last_chunk = _.last_chunk; else {
					var p = this._copy_event(o);
					p.id = o.id, p._length = n - o._sday, p._eday = n, p._sday = o._sday, p._sweek = o._sweek, p._sorder = o._sorder, p.end_date = this.date.add(c, p._length, "day"), p._first_chunk = _.first_chunk, _.first_chunk && (_.first_chunk = !1), a.push(p), m[f] = p, i = p.end_date, s[o._sweek] = m.length - 1, l--
				}
			}
		}
		return a
	},scheduler._copy_dummy = function () {
		var e = new Date(this.start_date), t = new Date(this.end_date);
		this.start_date = e, this.end_date = t
	},scheduler._copy_event = function (e) {
		return this._copy_dummy.prototype = e, new this._copy_dummy
	},scheduler._rendered = [],scheduler.clear_view = function () {
		for (var e = 0; e < this._rendered.length; e++) {
			var t = this._rendered[e];
			t.parentNode && t.parentNode.removeChild(t)
		}
		this._rendered = []
	},scheduler.updateEvent = function (e) {
		var t = this.getEvent(e);
		this.clear_event(e), t && this.is_visible_events(t) && this.filter_event(e, t) && (this._table_view || this.config.multi_day || t._timed) && (this.config.update_render ? this.render_view_data() : "month" != this.getState().mode || this.getState().drag_id || this.isOneDayEvent(t) ? this.render_view_data([t], !0) : this.render_view_data());
	},scheduler.clear_event = function (e) {
		this.for_rendered(e, function (e, t) {
			e.parentNode && e.parentNode.removeChild(e), scheduler._rendered.splice(t, 1)
		})
	},scheduler._y_from_date = function (e) {
		var t = 60 * e.getHours() + e.getMinutes();
		return Math.round((60 * t * 1e3 - 60 * this.config.first_hour * 60 * 1e3) * this.config.hour_size_px / 36e5) % (24 * this.config.hour_size_px)
	},scheduler._calc_event_y = function (e, t) {
		t = t || 0;
		var i = 60 * e.start_date.getHours() + e.start_date.getMinutes(), a = 60 * e.end_date.getHours() + e.end_date.getMinutes() || 60 * scheduler.config.last_hour, r = this._y_from_date(e.start_date), s = Math.max(t, (a - i) * this.config.hour_size_px / 60);
		return {top: r, height: s}
	},scheduler.render_event = function (e) {
		var t = scheduler.xy.menu_width, i = this.config.use_select_menu_space ? 0 : t;
		if (!(e._sday < 0)) {
			var a = scheduler.locate_holder(e._sday);
			if (a) {
				var r = this._calc_event_y(e, scheduler.xy.min_event_height), s = r.top, n = r.height, d = e._count || 1, l = e._sorder || 0, o = Math.floor((a.clientWidth - i) / d), h = l * o + 1;
				if (e._inner || (o *= d - l), this.config.cascade_event_display) {
					var _ = this.config.cascade_event_count, c = this.config.cascade_event_margin;
					h = l % _ * c;
					var u = e._inner ? (d - l - 1) % _ * c / 2 : 0;
					o = Math.floor(a.clientWidth - i - h - u)
				}
				var g = this._render_v_bar(e, i + h, s, o, n, e._text_style, scheduler.templates.event_header(e.start_date, e.end_date, e), scheduler.templates.event_text(e.start_date, e.end_date, e));
				if (this._waiAria.eventAttr(e, g), this._rendered.push(g), a.appendChild(g), h = h + parseInt(a.style.left, 10) + i, this._edit_id == e.id) {
					g.style.zIndex = 1, o = Math.max(o - 4, scheduler.xy.editor_width), g = document.createElement("DIV"), g.setAttribute("event_id", e.id), this._waiAria.eventAttr(e, g), this.set_xy(g, o, n - 20, h, s + 14),
						g.className = "dhx_cal_event dhx_cal_editor";
					var v = scheduler.templates.event_class(e.start_date, e.end_date, e);
					v && (g.className += " " + v);
					var f = document.createElement("DIV");
					this.set_xy(f, o - 6, n - 26), f.style.cssText += ";margin:2px 2px 2px 2px;overflow:hidden;", g.appendChild(f), this._els.dhx_cal_data[0].appendChild(g), this._rendered.push(g), f.innerHTML = "<textarea class='dhx_cal_editor'>" + e.text + "</textarea>", this._quirks7 && (f.firstChild.style.height = n - 12 + "px"), this._editor = f.firstChild, this._editor.onkeydown = function (e) {
						if ((e || event).shiftKey)return !0;
						var t = (e || event).keyCode;
						t == scheduler.keys.edit_save && scheduler.editStop(!0), t == scheduler.keys.edit_cancel && scheduler.editStop(!1)
					}, this._editor.onselectstart = function (e) {
						return (e || event).cancelBubble = !0, !0
					}, scheduler._focus(f.firstChild, !0), this._els.dhx_cal_data[0].scrollLeft = 0
				}
				if (0 !== this.xy.menu_width && this._select_id == e.id) {
					this.config.cascade_event_display && this._drag_mode && (g.style.zIndex = 1);
					for (var m, p = this.config["icons_" + (this._edit_id == e.id ? "edit" : "select")], b = "", x = e.color ? "background-color: " + e.color + ";" : "", y = e.textColor ? "color: " + e.textColor + ";" : "", w = 0; w < p.length; w++)m = this._waiAria.eventMenuAttrString(p[w]),
						b += "<div class='dhx_menu_icon " + p[w] + "' style='" + x + y + "' title='" + this.locale.labels[p[w]] + "'" + m + "></div>";
					var D = this._render_v_bar(e, h - t + 1, s, t, 20 * p.length + 26 - 2, "", "<div style='" + x + y + "' class='dhx_menu_head'></div>", b, !0);
					D.style.left = h - t + 1, this._els.dhx_cal_data[0].appendChild(D), this._rendered.push(D)
				}
				this.config.drag_highlight && this._drag_id == e.id && this.highlightEventPosition(e)
			}
		}
	},scheduler._render_v_bar = function (e, t, i, a, r, s, n, d, l) {
		var o = document.createElement("DIV"), h = e.id, _ = l ? "dhx_cal_event dhx_cal_select_menu" : "dhx_cal_event", c = scheduler.templates.event_class(e.start_date, e.end_date, e);
		c && (_ = _ + " " + c);
		var u = e.color ? "background:" + e.color + ";" : "", g = e.textColor ? "color:" + e.textColor + ";" : "", v = '<div event_id="' + h + '" class="' + _ + '" style="position:absolute; top:' + i + "px; left:" + t + "px; width:" + (a - 4) + "px; height:" + r + "px;" + (s || "") + '"></div>';
		o.innerHTML = v;
		var f = o.cloneNode(!0).firstChild;
		if (!l && scheduler.renderEvent(f, e, a, r, n, d))return f;
		f = o.firstChild;
		var m = '<div class="dhx_event_move dhx_header" style=" width:' + (a - 6) + "px;" + u + '" >&nbsp;</div>';
		m += '<div class="dhx_event_move dhx_title" style="' + u + g + '">' + n + "</div>",
			m += '<div class="dhx_body" style=" width:' + (a - (this._quirks ? 4 : 14)) + "px; height:" + (r - (this._quirks ? 20 : 30) + 1) + "px;" + u + g + '">' + d + "</div>";
		var p = "dhx_event_resize dhx_footer";
		return l && (p = "dhx_resize_denied " + p), m += '<div class="' + p + '" style=" width:' + (a - 8) + "px;" + (l ? " margin-top:-1px;" : "") + u + g + '" ></div>', f.innerHTML = m, f
	},scheduler.renderEvent = function () {
		return !1
	},scheduler.locate_holder = function (e) {
		return "day" == this._mode ? this._els.dhx_cal_data[0].firstChild : this._els.dhx_cal_data[0].childNodes[e]
	},scheduler.locate_holder_day = function (e, t) {
		var i = Math.floor((this._correct_shift(e, 1) - this._min_date) / 864e5);
		return t && this.date.time_part(e) && i++, i
	},scheduler._get_dnd_order = function (e, t, i) {
		if (!this._drag_event)return e;
		this._drag_event._orig_sorder ? e = this._drag_event._orig_sorder : this._drag_event._orig_sorder = e;
		for (var a = t * e; a + t > i;)e--, a -= t;
		return e = Math.max(e, 0)
	},scheduler._get_event_bar_pos = function (e) {
		var t = this._colsS[e._sday], i = this._colsS[e._eday];
		i == t && (i = this._colsS[e._eday + 1]);
		var a = this.xy.bar_height, r = e._sorder;
		if (e.id == this._drag_id) {
			var s = this._colsS.heights[e._sweek + 1] - this._colsS.heights[e._sweek] - this.xy.month_head_height;
			r = scheduler._get_dnd_order(r, a, s)
		}
		var n = r * a, d = this._colsS.heights[e._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + n;
		return {x: t, x2: i, y: d}
	},scheduler.render_event_bar = function (e) {
		var t = this._rendered_location, i = this._get_event_bar_pos(e), a = i.y, r = i.x, s = i.x2, n = "";
		if (s) {
			var d = scheduler.config.resize_month_events && "month" == this._mode && (!e._timed || scheduler.config.resize_month_timed), l = document.createElement("DIV"), o = e.hasOwnProperty("_first_chunk") && e._first_chunk, h = e.hasOwnProperty("_last_chunk") && e._last_chunk, _ = d && (e._timed || o), c = d && (e._timed || h), u = "dhx_cal_event_clear";
			(!e._timed || d) && (u = "dhx_cal_event_line"), o && (u += " dhx_cal_event_line_start"), h && (u += " dhx_cal_event_line_end"), _ && (n += "<div class='dhx_event_resize dhx_event_resize_start'></div>"), c && (n += "<div class='dhx_event_resize dhx_event_resize_end'></div>");
			var g = scheduler.templates.event_class(e.start_date, e.end_date, e);
			g && (u += " " + g);
			var v = e.color ? "background:" + e.color + ";" : "", f = e.textColor ? "color:" + e.textColor + ";" : "", m = ["position:absolute", "top:" + a + "px", "left:" + r + "px", "width:" + (s - r - 15) + "px", f, v, e._text_style || ""].join(";"), p = "<div event_id='" + e.id + "' class='" + u + "' style='" + m + "'" + this._waiAria.eventBarAttrString(e) + ">";
			d && (p += n), "month" == scheduler.getState().mode && (e = scheduler.getEvent(e.id)), e._timed && (p += scheduler.templates.event_bar_date(e.start_date, e.end_date, e)), p += scheduler.templates.event_bar_text(e.start_date, e.end_date, e) + "</div>", p += "</div>", l.innerHTML = p, this._rendered.push(l.firstChild), t.appendChild(l.firstChild)
		}
	},scheduler._locate_event = function (e) {
		for (var t = null; e && !t && e.getAttribute;)t = e.getAttribute("event_id"), e = e.parentNode;
		return t
	},scheduler._locate_css = function (e, t, i) {
		void 0 === i && (i = !0);
		for (var a = e.target || e.srcElement, r = ""; a;) {
			if (r = scheduler._getClassName(a)) {
				var s = r.indexOf(t);
				if (s >= 0) {
					if (!i)return a;
					var n = 0 === s || !scheduler._trim(r.charAt(s - 1)), d = s + t.length >= r.length || !scheduler._trim(r.charAt(s + t.length));
					if (n && d)return a
				}
			}
			a = a.parentNode
		}
		return null
	},scheduler.edit = function (e) {
		this._edit_id != e && (this.editStop(!1, e), this._edit_id = e, this.updateEvent(e))
	},scheduler.editStop = function (e, t) {
		if (!t || this._edit_id != t) {
			var i = this.getEvent(this._edit_id);
			i && (e && (i.text = this._editor.value), this._edit_id = null, this._editor = null, this.updateEvent(i.id),
				this._edit_stop_event(i, e))
		}
	},scheduler._edit_stop_event = function (e, t) {
		this._new_event ? (t ? this.callEvent("onEventAdded", [e.id, e]) : e && this.deleteEvent(e.id, !0), this._new_event = null) : t && this.callEvent("onEventChanged", [e.id, e])
	},scheduler.getEvents = function (e, t) {
		var i = [];
		for (var a in this._events) {
			var r = this._events[a];
			r && (!e && !t || r.start_date < t && r.end_date > e) && i.push(r)
		}
		return i
	},scheduler.getRenderedEvent = function (e) {
		if (e) {
			for (var t = scheduler._rendered, i = 0; i < t.length; i++) {
				var a = t[i];
				if (a.getAttribute("event_id") == e)return a;
			}
			return null
		}
	},scheduler.showEvent = function (e, t) {
		var i = "number" == typeof e || "string" == typeof e ? scheduler.getEvent(e) : e;
		if (t = t || scheduler._mode, i && (!this.checkEvent("onBeforeEventDisplay") || this.callEvent("onBeforeEventDisplay", [i, t]))) {
			var a = scheduler.config.scroll_hour;
			scheduler.config.scroll_hour = i.start_date.getHours();
			var r = scheduler.config.preserve_scroll;
			scheduler.config.preserve_scroll = !1;
			var s = i.color, n = i.textColor;
			if (scheduler.config.highlight_displayed_event && (i.color = scheduler.config.displayed_event_color,
					i.textColor = scheduler.config.displayed_event_text_color), scheduler.setCurrentView(new Date(i.start_date), t), i.color = s, i.textColor = n, scheduler.config.scroll_hour = a, scheduler.config.preserve_scroll = r, scheduler.matrix && scheduler.matrix[t]) {
				var d = scheduler.getRenderedEvent(i.id);
				d && (scheduler._els.dhx_cal_data[0].scrollTop = getAbsoluteTop(d) - getAbsoluteTop(scheduler._els.dhx_cal_data[0]) - 20)
			}
			scheduler.callEvent("onAfterEventDisplay", [i, t])
		}
	},scheduler._append_drag_marker = function (e) {
		if (!e.parentNode) {
			var t = scheduler._els.dhx_cal_data[0], i = t.lastChild, a = scheduler._getClassName(i);
			a.indexOf("dhx_scale_holder") < 0 && i.previousSibling && (i = i.previousSibling), a = scheduler._getClassName(i), i && 0 === a.indexOf("dhx_scale_holder") && i.appendChild(e)
		}
	},scheduler._update_marker_position = function (e, t) {
		var i = scheduler._calc_event_y(t, 0);
		e.style.top = i.top + "px", e.style.height = i.height + "px"
	},scheduler.highlightEventPosition = function (e) {
		var t = document.createElement("div");
		t.setAttribute("event_id", e.id), this._rendered.push(t),
			this._update_marker_position(t, e);
		var i = this.templates.drag_marker_class(e.start_date, e.end_date, e), a = this.templates.drag_marker_content(e.start_date, e.end_date, e);
		t.className = "dhx_drag_marker", i && (t.className += " " + i), a && (t.innerHTML = a), this._append_drag_marker(t)
	},scheduler._loaded = {},scheduler._load = function (e, t) {
		if (e = e || this._load_url) {
			e += (-1 == e.indexOf("?") ? "?" : "&") + "timeshift=" + (new Date).getTimezoneOffset(), this.config.prevent_cache && (e += "&uid=" + this.uid());
			var i;
			if (t = t || this._date, this._load_mode) {
				var a = this.templates.load_format;
				for (t = this.date[this._load_mode + "_start"](new Date(t.valueOf())); t > this._min_date;)t = this.date.add(t, -1, this._load_mode);
				i = t;
				for (var r = !0; i < this._max_date;)i = this.date.add(i, 1, this._load_mode), this._loaded[a(t)] && r ? t = this.date.add(t, 1, this._load_mode) : r = !1;
				var s = i;
				do i = s, s = this.date.add(i, -1, this._load_mode); while (s > t && this._loaded[a(s)]);
				if (t >= i)return !1;
				for (dhtmlxAjax.get(e + "&from=" + a(t) + "&to=" + a(i), function (e) {
					scheduler.on_load(e)
				}); i > t;)this._loaded[a(t)] = !0, t = this.date.add(t, 1, this._load_mode);
			} else dhtmlxAjax.get(e, function (e) {
				scheduler.on_load(e)
			});
			return this.callEvent("onXLS", []), !0
		}
	},scheduler.on_load = function (e) {
		var t, i = !1;
		if (this._process && "xml" != this._process)try {
			t = this[this._process].parse(e.xmlDoc.responseText)
		} catch (a) {
			i = !0
		} else t = this._magic_parser(e), t || (i = !0);
		i && (this.callEvent("onLoadError", [e.xmlDoc]), t = []), scheduler._process_loading(t), this.callEvent("onXLE", [])
	},scheduler._process_loading = function (e) {
		this._loading = !0, this._not_render = !0;
		for (var t = 0; t < e.length; t++)this.callEvent("onEventLoading", [e[t]]) && this.addEvent(e[t]);
		this._not_render = !1, this._render_wait && this.render_view_data(), this._loading = !1, this._after_call && this._after_call(), this._after_call = null
	},scheduler._init_event = function (e) {
		e.text = e.text || e._tagvalue || "", e.start_date = scheduler._init_date(e.start_date), e.end_date = scheduler._init_date(e.end_date)
	},scheduler._init_date = function (e) {
		return e ? "string" == typeof e ? scheduler.templates.xml_date(e) : new Date(e) : null
	},scheduler.json = {},scheduler.json.parse = function (data) {
		"string" == typeof data && (window.JSON ? scheduler._temp = JSON.parse(data) : scheduler._temp = eval("(" + data + ")"),
			data = scheduler._temp ? scheduler._temp.data || scheduler._temp.d || scheduler._temp : []), data.dhx_security && (dhtmlx.security_key = data.dhx_security);
		var collections = scheduler._temp && scheduler._temp.collections ? scheduler._temp.collections : {}, collections_loaded = !1;
		for (var key in collections)if (collections.hasOwnProperty(key)) {
			collections_loaded = !0;
			var collection = collections[key], arr = scheduler.serverList[key];
			if (!arr)continue;
			arr.splice(0, arr.length);
			for (var j = 0; j < collection.length; j++) {
				var option = collection[j], obj = {
					key: option.value, label: option.label
				};
				for (var option_key in option)if (option.hasOwnProperty(option_key)) {
					if ("value" == option_key || "label" == option_key)continue;
					obj[option_key] = option[option_key]
				}
				arr.push(obj)
			}
		}
		collections_loaded && scheduler.callEvent("onOptionsLoad", []);
		for (var evs = [], i = 0; i < data.length; i++) {
			var event = data[i];
			scheduler._init_event(event), evs.push(event)
		}
		return evs
	},scheduler.parse = function (e, t) {
		this._process = t, this.on_load({xmlDoc: {responseText: e}})
	},scheduler.load = function (e, t) {
		"string" == typeof t && (this._process = t,
			t = arguments[2]), this._load_url = e, this._after_call = t, this._load(e, this._date)
	},scheduler.setLoadMode = function (e) {
		"all" == e && (e = ""), this._load_mode = e
	},scheduler.serverList = function (e, t) {
		return t ? (this.serverList[e] = t.slice(0), this.serverList[e]) : (this.serverList[e] = this.serverList[e] || [], this.serverList[e])
	},scheduler._userdata = {},scheduler._magic_parser = function (e) {
		var t;
		if (!e.getXMLTopNode) {
			var i = e.xmlDoc.responseText;
			e = new dtmlXMLLoaderObject(function () {
			}), e.loadXMLString(i)
		}
		if (t = e.getXMLTopNode("data"),
			"data" != t.tagName)return null;
		var a = t.getAttribute("dhx_security");
		a && (dhtmlx.security_key = a);
		for (var r = e.doXPath("//coll_options"), s = 0; s < r.length; s++) {
			var n = r[s].getAttribute("for"), d = this.serverList[n];
			if (d) {
				d.splice(0, d.length);
				for (var l = e.doXPath(".//item", r[s]), o = 0; o < l.length; o++) {
					for (var h = l[o], _ = h.attributes, c = {
						key: l[o].getAttribute("value"),
						label: l[o].getAttribute("label")
					}, u = 0; u < _.length; u++) {
						var g = _[u];
						"value" != g.nodeName && "label" != g.nodeName && (c[g.nodeName] = g.nodeValue)
					}
					d.push(c)
				}
			}
		}
		r.length && scheduler.callEvent("onOptionsLoad", []);
		for (var v = e.doXPath("//userdata"), s = 0; s < v.length; s++) {
			var f = this._xmlNodeToJSON(v[s]);
			this._userdata[f.name] = f.text
		}
		var m = [];
		t = e.doXPath("//event");
		for (var s = 0; s < t.length; s++) {
			var p = m[s] = this._xmlNodeToJSON(t[s]);
			scheduler._init_event(p)
		}
		return m
	},scheduler._xmlNodeToJSON = function (e) {
		for (var t = {}, i = 0; i < e.attributes.length; i++)t[e.attributes[i].name] = e.attributes[i].value;
		for (var i = 0; i < e.childNodes.length; i++) {
			var a = e.childNodes[i];
			1 == a.nodeType && (t[a.tagName] = a.firstChild ? a.firstChild.nodeValue : "");
		}
		return t.text || (t.text = e.firstChild ? e.firstChild.nodeValue : ""), t
	},scheduler.attachEvent("onXLS", function () {
		if (this.config.show_loading === !0) {
			var e;
			e = this.config.show_loading = document.createElement("DIV"), e.className = "dhx_loading", e.style.left = Math.round((this._x - 128) / 2) + "px", e.style.top = Math.round((this._y - 15) / 2) + "px", this._obj.appendChild(e)
		}
	}),scheduler.attachEvent("onXLE", function () {
		var e = this.config.show_loading;
		e && "object" == typeof e && (this._obj.removeChild(e), this.config.show_loading = !0)
	}),
	scheduler.ical = {
		parse: function (e) {
			var t = e.match(RegExp(this.c_start + "[^\f]*" + this.c_end, ""));
			if (t.length) {
				t[0] = t[0].replace(/[\r\n]+(?=[a-z \t])/g, " "), t[0] = t[0].replace(/\;[^:\r\n]*:/g, ":");
				for (var i, a = [], r = RegExp("(?:" + this.e_start + ")([^\f]*?)(?:" + this.e_end + ")", "g"); null !== (i = r.exec(t));) {
					for (var s, n = {}, d = /[^\r\n]+[\r\n]+/g; null !== (s = d.exec(i[1]));)this.parse_param(s.toString(), n);
					n.uid && !n.id && (n.id = n.uid), a.push(n)
				}
				return a
			}
		}, parse_param: function (e, t) {
			var i = e.indexOf(":");
			if (-1 != i) {
				var a = e.substr(0, i).toLowerCase(), r = e.substr(i + 1).replace(/\\\,/g, ",").replace(/[\r\n]+$/, "");
				"summary" == a ? a = "text" : "dtstart" == a ? (a = "start_date", r = this.parse_date(r, 0, 0)) : "dtend" == a && (a = "end_date", r = this.parse_date(r, 0, 0)), t[a] = r
			}
		}, parse_date: function (e, t, i) {
			var a = e.split("T"), r = !1;
			a[1] && (t = a[1].substr(0, 2), i = a[1].substr(2, 2), r = !("Z" != a[1][6]));
			var s = a[0].substr(0, 4), n = parseInt(a[0].substr(4, 2), 10) - 1, d = a[0].substr(6, 2);
			return scheduler.config.server_utc || r ? new Date(Date.UTC(s, n, d, t, i)) : new Date(s, n, d, t, i)
		}, c_start: "BEGIN:VCALENDAR", e_start: "BEGIN:VEVENT", e_end: "END:VEVENT", c_end: "END:VCALENDAR"
	},scheduler._lightbox_controls = {},scheduler.formSection = function (e) {
		var t = this.config.lightbox.sections, i = 0;
		for (i; i < t.length && t[i].name != e; i++);
		var a = t[i];
		scheduler._lightbox || scheduler.getLightbox();
		var r = document.getElementById(a.id), s = r.nextSibling, n = {
			section: a,
			header: r,
			node: s,
			getValue: function (e) {
				return scheduler.form_blocks[a.type].get_value(s, e || {}, a)
			},
			setValue: function (e, t) {
				return scheduler.form_blocks[a.type].set_value(s, e, t || {}, a)
			}
		}, d = scheduler._lightbox_controls["get_" + a.type + "_control"];
		return d ? d(n) : n
	},scheduler._lightbox_controls.get_template_control = function (e) {
		return e.control = e.node, e
	},scheduler._lightbox_controls.get_select_control = function (e) {
		return e.control = e.node.getElementsByTagName("select")[0], e
	},scheduler._lightbox_controls.get_textarea_control = function (e) {
		return e.control = e.node.getElementsByTagName("textarea")[0], e
	},scheduler._lightbox_controls.get_time_control = function (e) {
		return e.control = e.node.getElementsByTagName("select"), e
	},scheduler.form_blocks = {
		template: {
			render: function (e) {
				var t = (e.height || "30") + "px";
				return "<div class='dhx_cal_ltext dhx_cal_template' style='height:" + t + ";'></div>"
			}, set_value: function (e, t, i, a) {
				e.innerHTML = t || ""
			}, get_value: function (e, t, i) {
				return e.innerHTML || ""
			}, focus: function (e) {
			}
		}, textarea: {
			render: function (e) {
				var t = (e.height || "130") + "px";
				return "<div class='dhx_cal_ltext' style='height:" + t + ";'><textarea></textarea></div>"
			}, set_value: function (e, t, i) {
				scheduler.form_blocks.textarea._get_input(e).value = t || ""
			}, get_value: function (e, t) {
				return scheduler.form_blocks.textarea._get_input(e).value;
			}, focus: function (e) {
				var t = scheduler.form_blocks.textarea._get_input(e);
				scheduler._focus(t, !0)
			}, _get_input: function (e) {
				return e.getElementsByTagName("textarea")[0]
			}
		}, select: {
			render: function (e) {
				for (var t = (e.height || "23") + "px", i = "<div class='dhx_cal_ltext' style='height:" + t + ";'><select style='width:100%;'>", a = 0; a < e.options.length; a++)i += "<option value='" + e.options[a].key + "'>" + e.options[a].label + "</option>";
				return i += "</select></div>"
			}, set_value: function (e, t, i, a) {
				var r = e.firstChild;
				!r._dhx_onchange && a.onchange && (r.onchange = a.onchange,
					r._dhx_onchange = !0), "undefined" == typeof t && (t = (r.options[0] || {}).value), r.value = t || ""
			}, get_value: function (e, t) {
				return e.firstChild.value
			}, focus: function (e) {
				var t = e.firstChild;
				scheduler._focus(t, !0)
			}
		}, time: {
			render: function (e) {
				e.time_format || (e.time_format = ["%H:%i", "%d", "%m", "%Y"]), e._time_format_order = {};
				var t = e.time_format, i = scheduler.config, a = this.date.date_part(scheduler._currentDate()), r = 1440, s = 0;
				scheduler.config.limit_time_select && (r = 60 * i.last_hour + 1, s = 60 * i.first_hour, a.setHours(i.first_hour));
				for (var n = "", d = 0; d < t.length; d++) {
					var l = t[d];
					d > 0 && (n += " ");
					var o = "";
					switch (l) {
						case"%Y":
							e._time_format_order[3] = d;
							for (var h = a.getFullYear() - 5, _ = 0; 10 > _; _++)o += "<option value='" + (h + _) + "'>" + (h + _) + "</option>";
							break;
						case"%m":
							e._time_format_order[2] = d;
							for (var _ = 0; 12 > _; _++)o += "<option value='" + _ + "'>" + this.locale.date.month_full[_] + "</option>";
							break;
						case"%d":
							e._time_format_order[1] = d;
							for (var _ = 1; 32 > _; _++)o += "<option value='" + _ + "'>" + _ + "</option>";
							break;
						case"%H:%i":
							e._time_format_order[0] = d;
							var _ = s, c = a.getDate();
							for (e._time_values = []; r > _;) {
								var u = this.templates.time_picker(a);
								o += "<option value='" + _ + "'>" + u + "</option>", e._time_values.push(_), a.setTime(a.valueOf() + 60 * this.config.time_step * 1e3);
								var g = a.getDate() != c ? 1 : 0;
								_ = 24 * g * 60 + 60 * a.getHours() + a.getMinutes()
							}
					}
					if (o) {
						var v = scheduler._waiAria.lightboxSelectAttrString(l), f = e.readonly ? "disabled='disabled'" : "";
						n += "<select " + f + v + ">" + o + "</select> "
					}
				}
				return "<div style='height:30px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>" + n + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + n + "</div>";
			}, set_value: function (e, t, i, a) {
				function r(e, t, i) {
					for (var r = a._time_values, s = 60 * i.getHours() + i.getMinutes(), n = s, d = !1, l = 0; l < r.length; l++) {
						var h = r[l];
						if (h === s) {
							d = !0;
							break
						}
						s > h && (n = h)
					}
					e[t + o[0]].value = d ? s : n, d || n || (e[t + o[0]].selectedIndex = -1), e[t + o[1]].value = i.getDate(), e[t + o[2]].value = i.getMonth(), e[t + o[3]].value = i.getFullYear()
				}

				var s, n, d = scheduler.config, l = e.getElementsByTagName("select"), o = a._time_format_order;
				if (d.full_day) {
					if (!e._full_day) {
						var h = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler.locale.labels.full_day + "&nbsp;</label></input>";
						scheduler.config.wide_form || (h = e.previousSibling.innerHTML + h), e.previousSibling.innerHTML = h, e._full_day = !0
					}
					var _ = e.previousSibling.getElementsByTagName("input")[0];
					_.checked = 0 === scheduler.date.time_part(i.start_date) && 0 === scheduler.date.time_part(i.end_date), l[o[0]].disabled = _.checked, l[o[0] + l.length / 2].disabled = _.checked, _.onclick = function () {
						if (_.checked) {
							var t = {};
							scheduler.form_blocks.time.get_value(e, t, a), s = scheduler.date.date_part(t.start_date), n = scheduler.date.date_part(t.end_date), (+n == +s || +n >= +s && (0 !== i.end_date.getHours() || 0 !== i.end_date.getMinutes())) && (n = scheduler.date.add(n, 1, "day"));
						} else s = null, n = null;
						l[o[0]].disabled = _.checked, l[o[0] + l.length / 2].disabled = _.checked, r(l, 0, s || i.start_date), r(l, 4, n || i.end_date)
					}
				}
				if (d.auto_end_date && d.event_duration)for (var c = function () {
					s = new Date(l[o[3]].value, l[o[2]].value, l[o[1]].value, 0, l[o[0]].value), n = new Date(s.getTime() + 60 * scheduler.config.event_duration * 1e3), r(l, 4, n)
				}, u = 0; 4 > u; u++)l[u].onchange = c;
				r(l, 0, i.start_date), r(l, 4, i.end_date)
			}, get_value: function (e, t, i) {
				var a = e.getElementsByTagName("select"), r = i._time_format_order;
				if (t.start_date = new Date(a[r[3]].value, a[r[2]].value, a[r[1]].value, 0, a[r[0]].value),
						t.end_date = new Date(a[r[3] + 4].value, a[r[2] + 4].value, a[r[1] + 4].value, 0, a[r[0] + 4].value), !a[r[3]].value || !a[r[3] + 4].value) {
					var s = this.getEvent(this._lightbox_id);
					s && (t.start_date = s.start_date, t.end_date = s.end_date)
				}
				return t.end_date <= t.start_date && (t.end_date = scheduler.date.add(t.start_date, scheduler.config.time_step, "minute")), {
					start_date: new Date(t.start_date),
					end_date: new Date(t.end_date)
				}
			}, focus: function (e) {
				scheduler._focus(e.getElementsByTagName("select")[0])
			}
		}
	},scheduler.showCover = function (e) {
		if (e) {
			e.style.display = "block";
			var t = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop, i = window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft, a = window.innerHeight || document.documentElement.clientHeight;
			t ? e.style.top = Math.round(t + Math.max((a - e.offsetHeight) / 2, 0)) + "px" : e.style.top = Math.round(Math.max((a - e.offsetHeight) / 2, 0) + 9) + "px", document.documentElement.scrollWidth > document.body.offsetWidth ? e.style.left = Math.round(i + (document.body.offsetWidth - e.offsetWidth) / 2) + "px" : e.style.left = Math.round((document.body.offsetWidth - e.offsetWidth) / 2) + "px";
		}
		this.show_cover()
	},scheduler.showLightbox = function (e) {
		if (e) {
			if (!this.callEvent("onBeforeLightbox", [e]))return void(this._new_event && (this._new_event = null));
			var t = this.getLightbox();
			this.showCover(t), this._fill_lightbox(e, t), this._waiAria.lightboxVisibleAttr(t), this.callEvent("onLightbox", [e])
		}
	},scheduler._fill_lightbox = function (e, t) {
		var i = this.getEvent(e), a = t.getElementsByTagName("span"), r = [];
		if (scheduler.templates.lightbox_header) {
			r.push("");
			var s = scheduler.templates.lightbox_header(i.start_date, i.end_date, i);
			r.push(s), a[1].innerHTML = "", a[2].innerHTML = s
		} else {
			var n = this.templates.event_header(i.start_date, i.end_date, i), d = (this.templates.event_bar_text(i.start_date, i.end_date, i) || "").substr(0, 70);
			r.push(n), r.push(d), a[1].innerHTML = n, a[2].innerHTML = d
		}
		this._waiAria.lightboxHeader(t, r.join(" "));
		for (var l = this.config.lightbox.sections, o = 0; o < l.length; o++) {
			var h = l[o], _ = document.getElementById(h.id).nextSibling, c = this.form_blocks[h.type], u = void 0 !== i[h.map_to] ? i[h.map_to] : h.default_value;
			c.set_value.call(this, _, u, i, h),
			l[o].focus && c.focus.call(this, _)
		}
		scheduler._lightbox_id = e
	},scheduler._lightbox_out = function (e) {
		for (var t = this.config.lightbox.sections, i = 0; i < t.length; i++) {
			var a = document.getElementById(t[i].id);
			a = a ? a.nextSibling : a;
			var r = this.form_blocks[t[i].type], s = r.get_value.call(this, a, e, t[i]);
			"auto" != t[i].map_to && (e[t[i].map_to] = s)
		}
		return e
	},scheduler._empty_lightbox = function (e) {
		var t = scheduler._lightbox_id, i = this.getEvent(t);
		this.getLightbox();
		this._lame_copy(i, e), this.setEvent(i.id, i), this._edit_stop_event(i, !0),
			this.render_view_data()
	},scheduler.hide_lightbox = function (e) {
		var t = this.getLightbox();
		this.hideCover(t), this._waiAria.lightboxHiddenAttr(t), this._lightbox_id = null, this.callEvent("onAfterLightbox", [])
	},scheduler.hideCover = function (e) {
		e && (e.style.display = "none"), this.hide_cover()
	},scheduler.hide_cover = function () {
		this._cover && this._cover.parentNode.removeChild(this._cover), this._cover = null
	},scheduler.show_cover = function () {
		if (!this._cover) {
			this._cover = document.createElement("DIV"), this._cover.className = "dhx_cal_cover";
			var e = void 0 !== document.height ? document.height : document.body.offsetHeight, t = document.documentElement ? document.documentElement.scrollHeight : 0;
			this._cover.style.height = Math.max(e, t) + "px", document.body.appendChild(this._cover)
		}
	},scheduler.save_lightbox = function () {
		var e = this._lightbox_out({}, this._lame_copy(this.getEvent(this._lightbox_id)));
		(!this.checkEvent("onEventSave") || this.callEvent("onEventSave", [this._lightbox_id, e, this._new_event])) && (this._empty_lightbox(e), this.hide_lightbox())
	},scheduler.startLightbox = function (e, t) {
		this._lightbox_id = e, this._custom_lightbox = !0, this._temp_lightbox = this._lightbox, this._lightbox = t, this.showCover(t)
	},scheduler.endLightbox = function (e, t) {
		this._edit_stop_event(scheduler.getEvent(this._lightbox_id), e), e && scheduler.render_view_data(), this.hideCover(t), this._custom_lightbox && (this._lightbox = this._temp_lightbox, this._custom_lightbox = !1), this._temp_lightbox = this._lightbox_id = null
	},scheduler.resetLightbox = function () {
		scheduler._lightbox && !scheduler._custom_lightbox && scheduler._lightbox.parentNode.removeChild(scheduler._lightbox),
			scheduler._lightbox = null
	},scheduler.cancel_lightbox = function () {
		this.callEvent("onEventCancel", [this._lightbox_id, this._new_event]), this.endLightbox(!1), this.hide_lightbox()
	},scheduler._init_lightbox_events = function () {
		this.getLightbox().onclick = function (e) {
			var t = e ? e.target : event.srcElement;
			t.className || (t = t.previousSibling);
			var i = scheduler._getClassName(t);
			if (t && i)switch (i) {
				case"dhx_save_btn":
					scheduler.save_lightbox();
					break;
				case"dhx_delete_btn":
					var a = scheduler.locale.labels.confirm_deleting;
					scheduler._dhtmlx_confirm(a, scheduler.locale.labels.title_confirm_deleting, function () {
						scheduler.deleteEvent(scheduler._lightbox_id), scheduler._new_event = null, scheduler.hide_lightbox()
					});
					break;
				case"dhx_cancel_btn":
					scheduler.cancel_lightbox();
					break;
				default:
					if (t.getAttribute("dhx_button")) scheduler.callEvent("onLightboxButton", [i, t, e]); else {
						var r, s, n;
						-1 != i.indexOf("dhx_custom_button") && (-1 != i.indexOf("dhx_custom_button_") ? (r = t.parentNode.getAttribute("index"), n = t.parentNode.parentNode) : (r = t.getAttribute("index"), n = t.parentNode, t = t.firstChild)), r && (s = scheduler.form_blocks[scheduler.config.lightbox.sections[r].type],
							s.button_click(r, t, n, n.nextSibling))
					}
			}
		}, this.getLightbox().onkeydown = function (e) {
			var t = e || window.event, i = e.target || e.srcElement, a = i.querySelector("[dhx_button]");
			switch (a || (a = i.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")), (e || t).keyCode) {
				case 32:
					if ((e || t).shiftKey)return;
					a && a.click && a.click();
					break;
				case scheduler.keys.edit_save:
					if ((e || t).shiftKey)return;
					a && a.click ? a.click() : scheduler.save_lightbox();
					break;
				case scheduler.keys.edit_cancel:
					scheduler.cancel_lightbox()
			}
		}
	},scheduler.setLightboxSize = function () {
		var e = this._lightbox;
		if (e) {
			var t = e.childNodes[1];
			t.style.height = "0px", t.style.height = t.scrollHeight + "px", e.style.height = t.scrollHeight + scheduler.xy.lightbox_additional_height + "px", t.style.height = t.scrollHeight + "px"
		}
	},scheduler._init_dnd_events = function () {
		dhtmlxEvent(document.body, "mousemove", scheduler._move_while_dnd), dhtmlxEvent(document.body, "mouseup", scheduler._finish_dnd), scheduler._init_dnd_events = function () {
		}
	},scheduler._move_while_dnd = function (e) {
		if (scheduler._dnd_start_lb) {
			document.dhx_unselectable || (document.body.className += " dhx_unselectable",
				document.dhx_unselectable = !0);
			var t = scheduler.getLightbox(), i = e && e.target ? [e.pageX, e.pageY] : [event.clientX, event.clientY];
			t.style.top = scheduler._lb_start[1] + i[1] - scheduler._dnd_start_lb[1] + "px", t.style.left = scheduler._lb_start[0] + i[0] - scheduler._dnd_start_lb[0] + "px"
		}
	},scheduler._ready_to_dnd = function (e) {
		var t = scheduler.getLightbox();
		scheduler._lb_start = [parseInt(t.style.left, 10), parseInt(t.style.top, 10)], scheduler._dnd_start_lb = e && e.target ? [e.pageX, e.pageY] : [event.clientX, event.clientY]
	},scheduler._finish_dnd = function () {
		scheduler._lb_start && (scheduler._lb_start = scheduler._dnd_start_lb = !1, document.body.className = document.body.className.replace(" dhx_unselectable", ""), document.dhx_unselectable = !1)
	},scheduler.getLightbox = function () {
		if (!this._lightbox) {
			var e = document.createElement("DIV");
			e.className = "dhx_cal_light", scheduler.config.wide_form && (e.className += " dhx_cal_light_wide"), scheduler.form_blocks.recurring && (e.className += " dhx_cal_light_rec"), /msie|MSIE 6/.test(navigator.userAgent) && (e.className += " dhx_ie6"), e.style.visibility = "hidden";
			for (var t = this._lightbox_template, i = this.config.buttons_left, a = "", r = 0; r < i.length; r++)a = this._waiAria.lightboxButtonAttrString(i[r]), t += "<div " + a + " class='dhx_btn_set dhx_left_btn_set " + i[r] + "_set'><div dhx_button='1' class='" + i[r] + "'></div><div>" + scheduler.locale.labels[i[r]] + "</div></div>";
			i = this.config.buttons_right;
			for (var r = 0; r < i.length; r++)a = this._waiAria.lightboxButtonAttrString(i[r]), t += "<div " + a + " class='dhx_btn_set dhx_right_btn_set " + i[r] + "_set' style='float:right;'><div dhx_button='1' class='" + i[r] + "'></div><div>" + scheduler.locale.labels[i[r]] + "</div></div>";
			t += "</div>", e.innerHTML = t, scheduler.config.drag_lightbox && (e.firstChild.onmousedown = scheduler._ready_to_dnd, e.firstChild.onselectstart = function () {
				return !1
			}, e.firstChild.style.cursor = "pointer", scheduler._init_dnd_events()), this._waiAria.lightboxAttr(e), document.body.insertBefore(e, document.body.firstChild), this._lightbox = e;
			var s = this.config.lightbox.sections;
			t = "";
			for (var r = 0; r < s.length; r++) {
				var n = this.form_blocks[s[r].type];
				if (n) {
					s[r].id = "area_" + this.uid();
					var d = "";
					if (s[r].button) {
						var a = scheduler._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_" + s[r].button]);
						d = "<div " + a + " class='dhx_custom_button' index='" + r + "'><div class='dhx_custom_button_" + s[r].button + "'></div><div>" + this.locale.labels["button_" + s[r].button] + "</div></div>"
					}
					this.config.wide_form && (t += "<div class='dhx_wrap_section'>");
					var l = this.locale.labels["section_" + s[r].name];
					"string" != typeof l && (l = s[r].name), t += "<div id='" + s[r].id + "' class='dhx_cal_lsection'>" + d + "<label>" + l + "</label></div>" + n.render.call(this, s[r]), t += "</div>"
				}
			}
			for (var o = e.getElementsByTagName("div"), r = 0; r < o.length; r++) {
				var h = o[r], _ = scheduler._getClassName(h);
				if ("dhx_cal_larea" == _) {
					h.innerHTML = t;
					break
				}
			}
			for (var r = 0; r < s.length; r++) {
				var c = s[r];
				if (c.id && document.getElementById(c.id)) {
					var u = document.getElementById(c.id), g = u.querySelector("label"), v = u.nextSibling;
					if (v) {
						var f = v.querySelector("input, select, textarea");
						f && (c.inputId = f.id || "input_" + scheduler.uid(), f.id || (f.id = c.inputId), g.setAttribute("for", c.inputId))
					}
				}
			}
			this.setLightboxSize(), this._init_lightbox_events(this), e.style.display = "none", e.style.visibility = "visible"
		}
		return this._lightbox
	},scheduler.attachEvent("onEventIdChange", function (e, t) {
		this._lightbox_id == e && (this._lightbox_id = t)
	}),scheduler._lightbox_template = "<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>",scheduler._init_touch_events = function () {
		"force" != this.config.touch && (this.config.touch = this.config.touch && (-1 != navigator.userAgent.indexOf("Mobile") || -1 != navigator.userAgent.indexOf("iPad") || -1 != navigator.userAgent.indexOf("Android") || -1 != navigator.userAgent.indexOf("Touch"))),
		this.config.touch && (this.xy.scroll_width = 0, window.navigator.msPointerEnabled ? (this._touch_events(["MSPointerMove", "MSPointerDown", "MSPointerUp"], function (e) {
				return e.pointerType == e.MSPOINTER_TYPE_MOUSE ? null : e
			}, function (e) {
				return !e || e.pointerType == e.MSPOINTER_TYPE_MOUSE || scheduler._pointerDragId && scheduler._pointerDragId != e.pointerId
			}), this._obj.ondblclick = function () {
			}) : this._touch_events(["touchmove", "touchstart", "touchend"], function (e) {
				return e.touches && e.touches.length > 1 ? null : e.touches && e.touches[0] ? {
							target: e.target, pageX: e.touches[0].pageX, pageY: e.touches[0].pageY
						} : e
			}, function (e) {
				return !!(e.touches && e.touches.length > 1)
			}))
	},scheduler._touch_events = function (e, t, i) {
		function a(e, t, i) {
			dhtmlxEvent(e, t, function (e) {
				return scheduler._is_lightbox_open() ? !0 : i(e)
			})
		}

		function r(e, t, i, a) {
			if (e && t) {
				for (var r = e.target; r && r != scheduler._obj;)r = r.parentNode;
				if (r == scheduler._obj) {
					var s = Math.abs(e.pageY - t.pageY), n = Math.abs(e.pageX - t.pageX);
					a > s && n > i && (!s || n / s > 3) && (e.pageX > t.pageX ? scheduler._click.dhx_cal_next_button() : scheduler._click.dhx_cal_prev_button());
				}
			}
		}

		function s(e) {
			var t = scheduler.getState().drag_mode, i = scheduler.matrix ? scheduler.matrix[scheduler._mode] : !1, a = scheduler.render_view_data;
			"create" == t && i && (scheduler.render_view_data = function () {
				for (var e = scheduler.getState().drag_id, t = scheduler.getEvent(e), a = i.y_property, r = scheduler.getEvents(t.start_date, t.end_date), s = 0; s < r.length; s++)r[s][a] != t[a] && (r.splice(s, 1), s--);
				t._sorder = r.length - 1, t._count = r.length, this.render_data([t], scheduler.getState().mode)
			}), scheduler._on_mouse_move(e), "create" == t && i && (scheduler.render_view_data = a);
		}

		function n(e) {
			scheduler._hide_global_tip(), h && (scheduler._on_mouse_up(t(e || event)), scheduler._temp_touch_block = !1), scheduler._drag_id = null, scheduler._drag_mode = null, scheduler._drag_pos = null, scheduler._pointerDragId = null, clearTimeout(o), h = c = !1, _ = !0
		}

		var d, l, o, h, _, c, u = (-1 != navigator.userAgent.indexOf("Android") && -1 != navigator.userAgent.indexOf("WebKit"), 0);
		a(document.body, e[0], function (e) {
			if (!i(e)) {
				var a = t(e);
				if (a) {
					if (h)return s(a), scheduler._update_global_tip(), e.preventDefault && e.preventDefault(),
						e.cancelBubble = !0, !1;
					if (l = t(e), c)return l ? void((d.target != l.target || Math.abs(d.pageX - l.pageX) > 5 || Math.abs(d.pageY - l.pageY) > 5) && (_ = !0, clearTimeout(o))) : void(_ = !0)
				}
			}
		}), a(this._els.dhx_cal_data[0], "scroll", n), a(this._els.dhx_cal_data[0], "touchcancel", n), a(this._els.dhx_cal_data[0], "contextmenu", function (e) {
			return c ? (e && e.preventDefault && e.preventDefault(), (e || event).cancelBubble = !0, !1) : void 0
		}), a(this._obj, e[1], function (e) {
			if (!i(e)) {
				scheduler._pointerDragId = e.pointerId;
				var a;
				if (h = _ = !1, c = !0, scheduler._temp_touch_block = !0,
						a = l = t(e), !a)return void(_ = !0);
				var r = new Date;
				if (!_ && !h && 250 > r - u)return scheduler._click.dhx_cal_data(a), window.setTimeout(function () {
					a.type = "dblclick", scheduler._on_dbl_click(a)
				}, 50), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, scheduler._block_next_stop = !0, !1;
				if (u = r, !_ && !h && scheduler.config.touch_drag) {
					var s = scheduler._locate_event(document.activeElement), n = scheduler._locate_event(a.target), g = d ? scheduler._locate_event(d.target) : null;
					if (s && n && s == n && s != g)return e.preventDefault && e.preventDefault(),
						e.cancelBubble = !0, scheduler._ignore_next_click = !1, scheduler._click.dhx_cal_data(a), d = a, !1;
					o = setTimeout(function () {
						h = !0;
						var e = d.target, t = scheduler._getClassName(e);
						e && -1 != t.indexOf("dhx_body") && (e = e.previousSibling), scheduler._on_mouse_down(d, e), scheduler._drag_mode && "create" != scheduler._drag_mode && scheduler.for_rendered(scheduler._drag_id, function (e, t) {
							e.style.display = "none", scheduler._rendered.splice(t, 1)
						}), scheduler.config.touch_tip && scheduler._show_global_tip(), scheduler.updateEvent(scheduler._drag_id);
					}, scheduler.config.touch_drag), d = a
				}
			}
		}), a(this._els.dhx_cal_data[0], e[2], function (e) {
			return i(e) ? void 0 : (h || r(d, l, 200, 100), h && (scheduler._ignore_next_click = !0), n(e), scheduler._block_next_stop ? (scheduler._block_next_stop = !1, e.preventDefault && e.preventDefault(), e.cancelBubble = !0, !1) : void 0)
		}), dhtmlxEvent(document.body, e[2], n)
	},scheduler._show_global_tip = function () {
		scheduler._hide_global_tip();
		var e = scheduler._global_tip = document.createElement("DIV");
		e.className = "dhx_global_tip", scheduler._update_global_tip(1),
			document.body.appendChild(e)
	},scheduler._update_global_tip = function (e) {
		var t = scheduler._global_tip;
		if (t) {
			var i = "";
			if (scheduler._drag_id && !e) {
				var a = scheduler.getEvent(scheduler._drag_id);
				a && (i = "<div>" + (a._timed ? scheduler.templates.event_header(a.start_date, a.end_date, a) : scheduler.templates.day_date(a.start_date, a.end_date, a)) + "</div>")
			}
			"create" == scheduler._drag_mode || "new-size" == scheduler._drag_mode ? t.innerHTML = (scheduler.locale.labels.drag_to_create || "Drag to create") + i : t.innerHTML = (scheduler.locale.labels.drag_to_move || "Drag to move") + i;
		}
	},scheduler._hide_global_tip = function () {
		var e = scheduler._global_tip;
		e && e.parentNode && (e.parentNode.removeChild(e), scheduler._global_tip = 0)
	},scheduler._dp_init = function (e) {
		e._methods = ["_set_event_text_style", "", "_dp_change_event_id", "_dp_hook_delete"], this._dp_change_event_id = function (e, t) {
			scheduler.getEvent(e) && scheduler.changeEventId(e, t)
		}, this._dp_hook_delete = function (t, i) {
			return scheduler.getEvent(t) ? (t != i && ("true_deleted" == this.getUserData(t, e.action_param) && this.setUserData(t, e.action_param, "updated"),
					this.changeEventId(t, i)), this.deleteEvent(i, !0)) : void 0
		}, this.attachEvent("onEventAdded", function (t) {
			!this._loading && this._validId(t) && e.setUpdated(t, !0, "inserted")
		}), this.attachEvent("onConfirmedBeforeEventDelete", function (t) {
			if (this._validId(t)) {
				var i = e.getState(t);
				return "inserted" == i || this._new_event ? (e.setUpdated(t, !1), !0) : "deleted" == i ? !1 : "true_deleted" == i ? !0 : (e.setUpdated(t, !0, "deleted"), !1)
			}
		}), this.attachEvent("onEventChanged", function (t) {
			!this._loading && this._validId(t) && e.setUpdated(t, !0, "updated");
		}), scheduler.attachEvent("onClearAll", function () {
			e._in_progress = {}, e._invalid = {}, e.updatedRows = [], e._waitMode = 0
		}), e._objToJson = function (t, i, a) {
			a = a || "", i = i || {};
			for (var r in t)0 !== r.indexOf("_") && (t[r] && t[r].getUTCFullYear ? i[a + r] = this.obj.templates.xml_format(t[r]) : t[r] && "object" == typeof t[r] ? e._objToJson(t[r], i, a + r + ".") : i[a + r] = t[r]);
			return i
		}, e._getRowData = function (e, t) {
			var i = this.obj.getEvent(e);
			return this._objToJson(i)
		}, e._clearUpdateFlag = function () {
		}, e.attachEvent("insertCallback", scheduler._update_callback),
			e.attachEvent("updateCallback", scheduler._update_callback), e.attachEvent("deleteCallback", function (e, t) {
			this.obj.getEvent(t) ? (this.obj.setUserData(t, this.action_param, "true_deleted"), this.obj.deleteEvent(t)) : this.obj._add_rec_marker && this.obj._update_callback(e, t)
		})
	},scheduler._validId = function (e) {
		return !0
	},scheduler.setUserData = function (e, t, i) {
		if (e) {
			var a = this.getEvent(e);
			a && (a[t] = i)
		} else this._userdata[t] = i
	},scheduler.getUserData = function (e, t) {
		if (e) {
			var i = this.getEvent(e);
			return i ? i[t] : null
		}
		return this._userdata[t];
	},scheduler._set_event_text_style = function (e, t) {
		if (scheduler.getEvent(e)) {
			this.for_rendered(e, function (e) {
				e.style.cssText += ";" + t
			});
			var i = this.getEvent(e);
			i._text_style = t, this.event_updated(i)
		}
	},scheduler._update_callback = function (e, t) {
		var i = scheduler._xmlNodeToJSON(e.firstChild);
		"none" == i.rec_type && (i.rec_pattern = "none"), i.text = i.text || i._tagvalue, i.start_date = scheduler.templates.xml_date(i.start_date), i.end_date = scheduler.templates.xml_date(i.end_date), scheduler.addEvent(i), scheduler._add_rec_marker && scheduler.setCurrentView();
	},scheduler._skin_settings = {
		fix_tab_position: [1, 0],
		use_select_menu_space: [1, 0],
		wide_form: [1, 0],
		hour_size_px: [44, 42],
		displayed_event_color: ["#ff4a4a", "ffc5ab"],
		displayed_event_text_color: ["#ffef80", "7e2727"]
	},scheduler._skin_xy = {
		lightbox_additional_height: [90, 50],
		nav_height: [59, 22],
		bar_height: [24, 20]
	},scheduler._configure = function (e, t, i) {
		for (var a in t)"undefined" == typeof e[a] && (e[a] = t[a][i])
	},scheduler._skin_init = function () {
		if (!scheduler.skin)for (var e = document.getElementsByTagName("link"), t = 0; t < e.length; t++) {
			var i = e[t].href.match("dhtmlxscheduler_([a-z]+).css");
			if (i) {
				scheduler.skin = i[1];
				break
			}
		}
		var a = 0;
		if (!scheduler.skin || "classic" !== scheduler.skin && "glossy" !== scheduler.skin || (a = 1), this._configure(scheduler.config, scheduler._skin_settings, a), this._configure(scheduler.xy, scheduler._skin_xy, a), "flat" === scheduler.skin && (scheduler.xy.scale_height = 35, scheduler.templates.hour_scale = function (e) {
				var t = e.getMinutes();
				t = 10 > t ? "0" + t : t;
				var i = "<span class='dhx_scale_h'>" + e.getHours() + "</span><span class='dhx_scale_m'>&nbsp;" + t + "</span>";
				return i
			}), !a) {
			var r = scheduler.config.minicalendar;
			r && (r.padding = 14), scheduler.templates.event_bar_date = function (e, t, i) {
				return "• <b>" + scheduler.templates.event_date(e) + "</b> "
			}, scheduler.attachEvent("onTemplatesReady", function () {
				var e = scheduler.date.date_to_str("%d");
				scheduler.templates._old_month_day || (scheduler.templates._old_month_day = scheduler.templates.month_day);
				var t = scheduler.templates._old_month_day;
				if (scheduler.templates.month_day = function (i) {
						if ("month" == this._mode) {
							var a = e(i);
							return 1 == i.getDate() && (a = scheduler.locale.date.month_full[i.getMonth()] + " " + a),
							+i == +scheduler.date.date_part(this._currentDate()) && (a = scheduler.locale.labels.dhx_cal_today_button + " " + a), a
						}
						return t.call(this, i)
					}, scheduler.config.fix_tab_position) {
					for (var i = scheduler._els.dhx_cal_navline[0].getElementsByTagName("div"), a = null, r = 211, s = 0; s < i.length; s++) {
						var n = i[s], d = n.getAttribute("name");
						if (d)switch (n.style.right = "auto", d) {
							case"day_tab":
								n.style.left = "14px", n.className += " dhx_cal_tab_first";
								break;
							case"week_tab":
								n.style.left = "75px";
								break;
							case"month_tab":
								n.style.left = "136px", n.className += " dhx_cal_tab_last";
								break;
							default:
								n.style.left = r + "px", n.className += " dhx_cal_tab_standalone", r = r + 14 + n.offsetWidth
						} else 0 === (n.className || "").indexOf("dhx_minical_icon") && n.parentNode == scheduler._els.dhx_cal_navline[0] && (a = n)
					}
					a && (a.style.left = r + "px")
				}
			}), scheduler._skin_init = function () {
			}
		}
	},window.jQuery && !function (e) {
		var t = 0, i = [];
		e.fn.dhx_scheduler = function (a) {
			if ("string" != typeof a) {
				var r = [];
				return this.each(function () {
					if (this && this.getAttribute)if (this.getAttribute("dhxscheduler")) r.push(window[this.getAttribute("dhxscheduler")]); else {
						var e = "scheduler";
						t && (e = "scheduler" + (t + 1), window[e] = Scheduler.getSchedulerInstance());
						var i = window[e];
						this.setAttribute("dhxscheduler", e);
						for (var s in a)"data" != s && (i.config[s] = a[s]);
						this.getElementsByTagName("div").length || (this.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',
							this.className += " dhx_cal_container"), i.init(this, i.config.date, i.config.mode), a.data && i.parse(a.data), r.push(i), t++
					}
				}), 1 === r.length ? r[0] : r
			}
			return i[a] ? i[a].apply(this, []) : void e.error("Method " + a + " does not exist on jQuery.dhx_scheduler")
		}
	}(jQuery),function () {
		function e(e, t, i) {
			t && (e._date = t), i && (e._mode = i)
		}

		var t = scheduler.setCurrentView, i = scheduler.updateView, a = null, r = null, s = function (t, s) {
			var n = this;
			window.clearTimeout(r), window.clearTimeout(a), e(this, t, s), r = setTimeout(function () {
				n.callEvent("onBeforeViewChange", [n._mode, n._date, s || n._mode, t || n._date]) && (i.call(n, t, s),
					n.callEvent("onViewChange", [n._mode, n._date]), window.clearTimeout(a), r = 0)
			}, scheduler.config.delay_render)
		}, n = function (t, s) {
			var n = this, d = arguments;
			e(this, t, s), window.clearTimeout(a), a = setTimeout(function () {
				r || i.apply(n, d)
			}, scheduler.config.delay_render)
		};
		scheduler.attachEvent("onSchedulerReady", function () {
			scheduler.config.delay_render ? (scheduler.setCurrentView = s, scheduler.updateView = n) : (scheduler.setCurrentView = t, scheduler.updateView = i)
		})
	}();
	for (var i = 0; i < Scheduler._schedulerPlugins.length; i++)Scheduler._schedulerPlugins[i](scheduler);
	return scheduler._internal_id = Scheduler._seed++, Scheduler.$syncFactory && Scheduler.$syncFactory(scheduler), scheduler
}, window.scheduler = Scheduler.getSchedulerInstance(), dhtmlx && dhtmlx.attaches && (dhtmlx.attaches.attachScheduler = function (e, t, i, a) {
	var i = i || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>', r = document.createElement("DIV");
	return r.id = "dhxSchedObj_" + this._genStr(12),
		r.innerHTML = '<div id="' + r.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + i + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>', document.body.appendChild(r.firstChild), this.attachObject(r.id, !1, !0), this.vs[this.av].sched = a, this.vs[this.av].schedId = r.id, a.setSizes = a.updateView,
		a.destructor = function () {
		}, a.init(r.id, e, t), this.vs[this._viewRestore()].sched
});
//# sourceMappingURL=sources/dhtmlxscheduler.js.map