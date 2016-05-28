window.Demo = {};

Demo.getFontName = function(){
    var font = Demo.Url.parse().font;
    return font || document.querySelector('[data-demo-stylesheet]').href.split('/').pop().replace('.css', '');
};

Demo.FontList = function(element, options){
    return {

        element: element,

        options: {
            selectedClass: options.selectedClass || ''
        },

        _buttons: null,

        _init: function(){
            this._buttons = [].slice.call(this.element.querySelectorAll('[data-demo-font-list-button]'));
            this._buttons.forEach(this._initButton.bind(this));
            this._selectFont(Demo.getFontName());
            return this;
        },

        _initButton: function(element){
            element.addEventListener('click', this._onButtonClick.bind(this));
        },

        _onButtonClick: function(event){
            event.preventDefault();
            var name = event.currentTarget.getAttribute('data-demo-font-list-button');
            this._selectFont(name);
        },

        _selectFont: function(name){
            var button = this._getButton(name);
            var cssClass = this.options.selectedClass;
            this.element.querySelector('.'+cssClass).classList.remove(cssClass);
            button.classList.add(cssClass);
            document.location.href = '#font=' + name;
        },

        _getButton: function(name){
            return this._buttons.filter(function(button){
                return button.getAttribute('data-demo-font-list-button') == name;
            }).pop();
        }

    }._init();
};

Demo.getFormattedFontName = function(){

    function uppercase(g){
        return ' ' + g[1].toUpperCase();
    }

    function and(g){
        return ' / ' + uppercase(g);
    }

    var name = Demo.getFontName();
    name = name.charAt(0).toUpperCase() + name.substr(1);
    name = name.replace(/-([a-z])/g, uppercase);
    name = name.replace(/_([a-z])/g, and);
    var split = name.split('/');
    if(split.length > 1){
        split[1] = '<p style="font-size: inherit; display: inline">' + split[1] + '</p>';
    }
    return split.join('/');
};

Demo.Url = {

    // https://gist.github.com/miohtama/1570295

    parse: function(){
        var url = window.location.href;
        var vars = {};
        var hashes = url.slice(url.indexOf('#') + 1).split('&');
        for(var i=0; i<hashes.length; i++) {
            var hash = hashes[i].split('=');
            if(hash.length > 1) {
                vars[hash[0]] = hash[1];
            } else {
                vars[hash[0]] = null;
            }
        }
        return vars;
    }
};

Demo.StyleSheet = function(element, options){

    return {

        element: element,

        options: {
            stylesheets: options.stylesheets || []
        },

        _link: null,

        _init: function(){
            this._link = this.element.querySelector('[data-demo-stylesheet]');
            this._setFont();
            window.onhashchange = this._onHashChange.bind(this);
            return this;
        },

        _onHashChange: function(){
            setTimeout(this._removeStylesheet.bind(this, this._link), 2500);
            this._setFont();
        },

        _setFont: function(){
            var font = Demo.Url.parse().font;
            if(font){
                var element = document.createElement('link');
                element.setAttribute('data-demo-stylesheet', '');
                element.rel = 'stylesheet';
                element.href = 'fonts/'+font+'.css';
                this._link.parentNode.insertBefore(element, this._link.nextSibling);
                this._link = element;
            }
        },

        _removeStylesheet: function(element){
            var styleSheets = document.querySelectorAll('[data-demo-stylesheet]');
            for(var i=0; i<styleSheets.length-1; i++){
                var styleSheet = styleSheets[i];
                styleSheet.parentNode.removeChild(styleSheet);
            }
        }

    }._init();
};

Demo.TextToggle = function(element, options){

    return {

        element: element,

        options: {
            targets: options.targets || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        },

        _init: function(){
            this.element.querySelector('[data-demo-text-toggle]').onclick = this._toggle.bind(this);
        },

        _toggle: function(event){
            event.preventDefault();
            var elements = this.element.querySelectorAll(this.options.targets);
            for(var i=0; i<elements.length; i++){
                var element = elements[i];
                element.innerHTML = element.innerHTML + '<br />' + element.innerHTML;
            }
        }

    }._init();
};

Demo.Nav = function(element, options){
    return {

        element: element,

        options: {
            sections: options.sections || []
        },

        _ul: null,

        _init: function(){
            this._ul = this.element.appendChild(document.createElement('ul'));
            [].slice.call(this.options.sections).forEach(this._renderSection.bind(this));
        },

        _renderSection: function(element, i){
            var id = 'demo-nav-'+i;
            element.id = id;
            var heading = this._getHeading(element);
            var codes = this._getCodes(element);
            this._createAnchor(id, heading, codes);
        },

        _getHeading: function(element){
            var heading = element.getAttribute('data-demo-nav-section');
            if(!heading){
                var h2 = element.querySelector('h2');
                heading = h2.textContent;
            }
            return heading;
        },

        _getCodes: function(element){
            var elements = element.querySelectorAll('code');
            return [].slice.call(elements).map(function(element){
                //return element.textContent;
            });
        },

        _createAnchor: function(id, label, codes){
            var li = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.href = '#'+id;
            anchor.innerText = label + ' ' + codes.join(' ');
            li.appendChild(anchor);
            this._ul.appendChild(li);
        }

    }._init();
}