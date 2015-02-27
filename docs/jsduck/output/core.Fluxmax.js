Ext.data.JsonP.core_Fluxmax({"tagname":"class","name":"core.Fluxmax","autodetected":{},"files":[{"filename":"Fluxmax.js","href":"Fluxmax.html#core-Fluxmax"}],"members":[{"name":"","tagname":"property","owner":"core.Fluxmax","id":"property-","meta":{}},{"name":"","tagname":"property","owner":"core.Fluxmax","id":"static-property-","meta":{"static":true}},{"name":"__instance","tagname":"property","owner":"core.Fluxmax","id":"static-property-__instance","meta":{"private":true,"static":true}},{"name":"__onEntityChange","tagname":"method","owner":"core.Fluxmax","id":"method-__onEntityChange","meta":{}},{"name":"addEntities","tagname":"method","owner":"core.Fluxmax","id":"method-addEntities","meta":{}},{"name":"addMetaEntity","tagname":"method","owner":"core.Fluxmax","id":"method-addMetaEntity","meta":{}},{"name":"checkDependencies","tagname":"method","owner":"core.Fluxmax","id":"method-checkDependencies","meta":{}},{"name":"injectChange","tagname":"method","owner":"core.Fluxmax","id":"method-injectChange","meta":{}},{"name":"offBatch","tagname":"method","owner":"core.Fluxmax","id":"method-offBatch","meta":{}},{"name":"offEach","tagname":"method","owner":"core.Fluxmax","id":"method-offEach","meta":{}},{"name":"onBatch","tagname":"method","owner":"core.Fluxmax","id":"method-onBatch","meta":{}},{"name":"onEach","tagname":"method","owner":"core.Fluxmax","id":"method-onEach","meta":{}},{"name":"renderDependencies","tagname":"method","owner":"core.Fluxmax","id":"method-renderDependencies","meta":{}},{"name":"setEntityChangeTypes","tagname":"method","owner":"core.Fluxmax","id":"method-setEntityChangeTypes","meta":{}},{"name":"getInstance","tagname":"method","owner":"core.Fluxmax","id":"static-method-getInstance","meta":{"static":true}}],"alternateClassNames":[],"aliases":{},"id":"class-core.Fluxmax","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Fluxmax.html#core-Fluxmax' target='_blank'>Fluxmax.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance properties</h3><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-property-' class='name expandable'></a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Your entity should have\n\nEntity.meta = {\n    id: 'id of the entity',\n    changeTypes: [\n        'change'      ,\n     ...</div><div class='long'><p>Your entity should have</p>\n\n<pre><code>Entity.meta = {\n    id: 'id of the entity',\n    changeTypes: [\n        'change'      ,\n        'anotherType' ,\n    ],\n    listeners: [] // See below\n}\n</code></pre>\n\n<p>This method is static and is only needed for debug purposes to immediately\nknow whenever your deps and listeners are correct.</p>\n\n<p>Items is an array of listener definition:</p>\n\n<pre><code>var listenerType = 'batch' // or 'each'\nvar entityId = 'a string' // for example 'store.currentAction'\nvar changeType = 'a string' // for example 'change' or 'reachedDestination'\nvar methodName = 'a string' // The method to be called on the entity when the change is fired.\nvar listeners = [\n    [listenerType, entityId, changeType, methodName]\n]\n</code></pre>\n</div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static properties</h3><div id='static-property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-static-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-static-property-' class='name expandable'></a> : Object<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='static-property-__instance' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-static-property-__instance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-static-property-__instance' class='name expandable'>__instance</a> : Object<span class=\"signature\"><span class='private' >private</span><span class='static' >static</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance methods</h3><div id='method-__onEntityChange' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-__onEntityChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-__onEntityChange' class='name expandable'>__onEntityChange</a>( <span class='pre'>entityId, changePayload</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Called when an entity changes. ...</div><div class='long'><p>Called when an entity changes.\nIt will emit the change to all entities.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>entityId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>changePayload</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-addEntities' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-addEntities' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-addEntities' class='name expandable'>addEntities</a>( <span class='pre'>entities</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>entities</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-addMetaEntity' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-addMetaEntity' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-addMetaEntity' class='name expandable'>addMetaEntity</a>( <span class='pre'>entityMeta</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>For static test. ...</div><div class='long'><p>For static test.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>entityMeta</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-checkDependencies' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-checkDependencies' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-checkDependencies' class='name expandable'>checkDependencies</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Check if the events that has been registered in the each and batch\nare valid based on the Entity.changeTypes provided. ...</div><div class='long'><p>Check if the events that has been registered in the <strong>each and </strong>batch\nare valid based on the Entity.changeTypes provided.</p>\n</div></div></div><div id='method-injectChange' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-injectChange' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-injectChange' class='name expandable'>injectChange</a>( <span class='pre'>entityId, changeType, changeData</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Adds a change to the system. ...</div><div class='long'><p>Adds a change to the system. Some entities might want to\nto use this way to make other know about their changes.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>entityId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>changeType</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>changeData</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-offBatch' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-offBatch' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-offBatch' class='name expandable'>offBatch</a>( <span class='pre'>callerSrc, targetSrc, targetType, runCb, callbackName, target</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Call to remove a listener for a batch change that happens in the app. ...</div><div class='long'><p>Call to remove a listener for a batch change that happens in the app.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callerSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetType</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>runCb</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>callbackName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-offEach' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-offEach' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-offEach' class='name expandable'>offEach</a>( <span class='pre'>callerSrc, targetSrc, targetType, runCb, callbackName, target</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Call to remove a listener for each change that happens in the app. ...</div><div class='long'><p>Call to remove a listener for each change that happens in the app.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callerSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetType</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>runCb</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>callbackName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onBatch' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-onBatch' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-onBatch' class='name expandable'>onBatch</a>( <span class='pre'>callerSrc, targetSrc, targetType, runCb, callbackName, target</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Call to add a listener for a batch change that happens in the app. ...</div><div class='long'><p>Call to add a listener for a batch change that happens in the app.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callerSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetType</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>runCb</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>callbackName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onEach' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-onEach' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-onEach' class='name expandable'>onEach</a>( <span class='pre'>callerSrc, targetSrc, targetType, runCb, callbackName, target</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Call to add a listener for each change that happens in the app. ...</div><div class='long'><p>Call to add a listener for each change that happens in the app.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callerSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetSrc</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>targetType</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>runCb</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>callbackName</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-renderDependencies' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-renderDependencies' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-renderDependencies' class='name expandable'>renderDependencies</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Only based on static deps. ...</div><div class='long'><p>Only based on static deps.</p>\n</div></div></div><div id='method-setEntityChangeTypes' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-method-setEntityChangeTypes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-method-setEntityChangeTypes' class='name expandable'>setEntityChangeTypes</a>( <span class='pre'>entityId, changeTypesDef</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>entityId</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>changeTypesDef</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-getInstance' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='core.Fluxmax'>core.Fluxmax</span><br/><a href='source/Fluxmax.html#core-Fluxmax-static-method-getInstance' target='_blank' class='view-source'>view source</a></div><a href='#!/api/core.Fluxmax-static-method-getInstance' class='name expandable'>getInstance</a>( <span class='pre'></span> )<span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});