var EventCenter = {
    on: function(type, handler){
        $(document).on(type, handler)
    },
    fire: function(type, data){
        $(document).trigger(type, data)
  }
}
// var Footer = {
//     init: function(){

//     },
//     bind: function(){

//     },
//     render: function(){

//     }
// }

// Footer.init()

var Footer = {
    init: function(){
        this.$footer = $('footer')
        this.$ul = this.$footer.find('ul')
        this.$box = this.$footer.find('.box')
        this.$leftBtn = this.$footer.find('.icon-left')
        this.$rightBtn = this.$footer.find('.icon-right')
        this.bind()
        this.render()
    },

    bind: function(){
        var _this = this
        this.$rightBtn.on('click', function(){
            var itemWidth = _this.$box.find('li').outerWidth(true)
            var rowCount = Math.floor(_this.$box.width()/itemWidth)
            _this.$ul.animate({
                left: '-='+rowCount*itemWidth
            }, 400)
        })
    },

    render(){
        var _this = this
        $.getJSON('http://api.jirengu.com/fm/getChannels.php')
        .done(function(ret){
            console.log(ret)
            _this.renderFooter(ret.channels)
        }).fail(function(){
            console.log('error')
        })
    },

    renderFooter: function(channels){
        console.log(channels)
        var html = ''
        channels.forEach(function(channel){
            html += '<li data-channel-id='+channel.channel_id+' data-channel-name='+channel.name+'>'
                    + '  <div class="cover" style="background-image:url('+channel.cover_small+')"></div>'
                    + '  <h3>'+channel.name+'</h3>'
                    +'</li>'
        })
        this.$ul.html(html)
        this.setStyle()
    },
    setStyle: function(){
        var count = this.$footer.find('li').length
        var width = this.$footer.find('li').outerWidth(true)
        this.$ul.css({
            width: count * width + 'px'
        })
    }
}

Footer.init()