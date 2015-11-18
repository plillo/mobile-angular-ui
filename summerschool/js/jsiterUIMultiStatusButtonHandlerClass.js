// ...................................
// ===================================
// jSiterUIMultiStatusButtonHandlerClass
// ===================================
jSiterUIMultiStatusButtonHandlerClass = function(pars){
   this.UIType = 'UIMULTISTATUSBUTTON';

   // parameters
   this.pars = pars;
   this.urlbase = pars.urlbase;
   this.input = pars.input;
   this.name = pars.name;
   this.target_field_selector = pars.target_field_selector;
   this.values = pars.values;
   if(this.values)
      this.values = this.values.split(','); 

   // properties
   this.locked = typeof(pars.locked)=='string'?pars.locked.split(','):[];
   this.bwidth = parseInt(pars.width);
   this.bheight = parseInt(pars.height);
   this.states = parseInt(pars.states);
   this.status =  parseInt(pars.status);
   this.step =  parseInt(pars.step);
   this.float = pars.float==''?'left':pars.float;
   this.display = pars.display==''?'inline-block':pars.display; // table
   this.id = pars.id;
   this.bkg = pars.bkg;
   this.api = pars.api;
   this.data = pars.data;
   this.left_pos = -(pars.status-1)*this.bwidth;
   this.$box = null;
};

// EXTENDING super-class: jSiterObservableClass
// ---------------------------------------------------------------------------
jSiterUIMultiStatusButtonHandlerClass.prototype = new jSiterObservableClass();
// ---------------------------------------------------------------------------

// lockedState
// ===========
jSiterUIMultiStatusButtonHandlerClass.prototype.lockedState = function(state){
   var is_locked = false;
   for(var i=0;i<this.locked.length;i++)
      if(parseInt(this.locked[i])==state){
         is_locked = true;
         break;
      };
   return is_locked;
};

// onRightClick
// ============
jSiterUIMultiStatusButtonHandlerClass.prototype.onRightClick = function(){
   var instance = this;
   return function(event){
      // notify observers
      instance.notifyObservers('rightclick',{status:instance.getStatus(),instance:instance,data:instance.data});
   };
};

// onClick
// =======
jSiterUIMultiStatusButtonHandlerClass.prototype.onClick = function(){
   var instance = this;
   return function(event){
      // notify observers
      instance.notifyObservers('click',{status:instance.getStatus(),instance:instance,data:instance.data});
   };
};

// onMouseOver 
// ===========
jSiterUIMultiStatusButtonHandlerClass.prototype.onMouseOver = function(){
   var instance = this;
   return function(event){
      instance.$box.css('background-position',instance.left_pos+'px -'+instance.bheight+'px');
      instance.$box.toggleClass('MouseOver',true);
      // notify observers
      instance.notifyObservers('mouseover',{status:instance.getStatus(),instance:instance,data:instance.data});
   };
};

// onMouseOut
// ==========
jSiterUIMultiStatusButtonHandlerClass.prototype.onMouseOut = function(){
   var instance = this;
   return function(event){
      instance.$box.css('background-position',instance.left_pos+'px -'+instance.bheight*2+'px');
      instance.$box.toggleClass('MouseOver',false);
      // notify observers
      instance.notifyObservers('mouseout',{status:instance.getStatus(),instance:instance,data:instance.data});
   };
};

// onMouseDown
// ===========
jSiterUIMultiStatusButtonHandlerClass.prototype.onMouseDown = function(){
   var instance = this; 
   return function(event){

      if(event.which==3) {
          instance.onRightClick(event);
          return;
      }

      instance.$box.css('background-position',instance.left_pos+'px 0');
      instance.$box.toggleClass('MouseDown',true);

      if(instance.step>0) {
          do {
              instance.status = (instance.status%instance.states)+instance.step;
          } while(instance.lockedState(instance.status));

          instance.$box.attr('jstr-status',instance.status);
          instance.$box.data('status',instance.status);
          if(instance.input)
             instance.$input_field.attr('value',instance.values?instance.values[instance.status-1]:instance.status);

          instance.left_pos = -(instance.status-1)*instance.bwidth;
      }

      // notify observers
      instance.notifyObservers('mousedown',{status:instance.getStatus(),instance:instance,data:instance.data});
   };
};

//event handler model
//===================
jSiterUIMultiStatusButtonHandlerClass.prototype.onMouseUp = function(){
   var instance = this; 
   return function(event){
      instance.$box.css('background-position',instance.left_pos+'px -'+instance.bheight*2+'px');
      instance.$box.toggleClass('MouseDown',false);

      // NO API => return
      if(instance.api==undefined || instance.api=='')
         return;

      var pars = {
         data   : instance.data,
         orgid  : instance.orgid,
         status : instance.status
      };
      $.jSiter.executeJSONPAPI(instance.urlbase+instance.api, pars, function(retJsonData){
         if(retJsonData.execution=='success'){
         }
         else{
         };
      });
      // notify observers
      instance.notifyObservers('mouseup',{status:instance.getStatus(),instance:instance,data:instance.data});
   };
};

// getData
// =======
jSiterUIMultiStatusButtonHandlerClass.prototype.getData = function(){
   return this.data;
};

// getStatus
// =========
jSiterUIMultiStatusButtonHandlerClass.prototype.getStatus = function(){
   return this.status;
};

// setStatus
// =========
jSiterUIMultiStatusButtonHandlerClass.prototype.setStatus = function(status){
   if(status<0 || status>this.states)
      return;

   this.status = status;

   this.$box.attr('jstr-status',this.status);
   this.$box.data('status',this.status);
   if(this.input)
       this.$input_field.attr('value',this.status);

   this.left_pos = -(this.status-1)*this.bwidth;
   this.$box.css('background-position',this.left_pos+'px -'+this.bheight*2+'px');

   if(!this.lockedState(this.status)){
      if(!this.$box.data('active')){
         this.$box.attr('jstr-active','true');
         this.$box.data('active',true);
         this.$box.css('cursor','pointer');
         this.$box.bind('mouseover',this.onMouseOver());
         this.$box.bind('mouseout',this.onMouseOut());
         this.$box.bind('mousedown',this.onMouseDown());
         this.$box.bind('mouseup',this.onMouseUp());
         this.$box.bind('click',this.onClick());
      }
   } else {
      this.$box.attr('jstr-active','false');
      this.$box.data('active',false);
      this.$box.css('cursor','auto');
      this.$box.unbind('mouseover');
      this.$box.unbind('mouseout');
      this.$box.unbind('mousedown');
      this.$box.unbind('mouseup');
      this.$box.unbind('click');
   };
};

// setText
// =======
jSiterUIMultiStatusButtonHandlerClass.prototype.setText = function(text){
   this.$text.html(text);
};

// getText
// =======
jSiterUIMultiStatusButtonHandlerClass.prototype.getText = function(){
   return this.$text.html();
};

// setLoading
// ==========
jSiterUIMultiStatusButtonHandlerClass.prototype.setLoading = function(){
   this.$loading.fadeIn();
};

// setLoading
// ==========
jSiterUIMultiStatusButtonHandlerClass.prototype.unsetLoading = function(){
   this.$loading.fadeOut();
};

// init
// ====
jSiterUIMultiStatusButtonHandlerClass.prototype.init = function(index, element){
   this.$box = $(element);
   this.$element = $(element);

   // Set a reference to object on DOM element for external access
   this.$box.data('instance', this);

   this.$text = $('span',this.$box);
   this.$loading = $('div.JstrLoading',this.$box);
   this.$input_field = $('input',this.$box);

   // SET status
   this.$box.data('status',this.status);
   this.$box.attr('jstr-status',this.status);
   this.$box.data('status',this.status);
   if(this.input && this.$input_field)
       this.$input_field.attr('value',this.values?this.values[this.status-1]:this.status);

   // SET data
   this.$box.data('data',this.data);

   if(!this.lockedState(this.status)){ 
      this.$box.attr('jstr-active','true');
      this.$box.data('active',true);
   };

   this.$box.css('background-image','url('+this.bkg+')');
   this.$box.css('background-position',this.left_pos+'px -'+this.bheight*2+'px');
   this.$box.css('width',this.bwidth);
   this.$box.css('height',this.bheight);
   this.$box.css('float',this.float);
   this.$box.css('display',this.display);

   if(!this.lockedState(this.status)){ 
      this.$box.css('cursor','pointer');
      this.$box.mouseover(this.onMouseOver());
      this.$box.mouseout(this.onMouseOut());
      this.$box.mousedown(this.onMouseDown());
      this.$box.mouseup(this.onMouseUp());
      this.$box.click(this.onClick());
   };

   var label_style = {
      'display': 'table-cell',
      'vertical-align':'top',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-o-user-select': 'none',
      'user-select': 'none'
   };

   this.$text.css(label_style);

   if(this.pars.onclick!=undefined)
      this.$box.bind('click',this.pars.onclick);
   if(this.pars.onmouseup!=undefined)
      this.$box.bind('mouseup',this.pars.onmouseup);
};