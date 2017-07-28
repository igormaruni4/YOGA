
  $(document).ready(function(){
    
    $(".nav").on("click", "a", function(event) {
      event.preventDefault();
      
      let id  = $(this).attr('href'),
          top = $(id).offset().top;
      
      $("body,html").animate({scrollTop: top}, 700);
      
      $(".nav li")
        .removeClass("nav_checked")
        .find("div")
        .removeClass("underline");
      
      $(this.nextElementSibling).addClass("underline");
      $(this.parentNode).addClass("nav_checked");
      
    });
    
    $(".gallery_img_wrap").hover(function () {
      $(this).find("div.shadow")
        .fadeIn( 400 )
        .addClass("on_hover");
    },
      function () {
        $(this).find("div.shadow")
          .fadeOut( 200 )
          .removeClass("on_hover");
      });
  
    let res;
    let regexps = [
      /^[A-zА-яЁё\s]+$/,
      /^\d+$/
    ];
  
    function say(elem, phrase, i) {
      if (i === undefined) {
        $(elem)
          .css("backgroundColor", "#FFC8C8")
          .attr("placeholder", phrase);
        return;
      } else $(elem).css("backgroundColor", "#C8FFC8");
    
      return phrase
    }
  
    function validator (value, regexp){
    
      if (value === "") {
        res = 'isEmpty';
      } else res = regexp.test(value);
    
      return res;
    }
  
    $(".btn_in_form").on("click", function (event) {
      event.preventDefault();
    
      $("input.input_name").val(
        function(i, val){
          console.log(i, val);
        
          let res = validator(val, regexps[0]);
        
          if(res === "isEmpty"){
            console.log(this);
            return say(this, "Fill in this field");
          } else if (!res) {
            return say(this, "Letters and spaces");
          }
        
          return say(this, val, i);
        }
      );
    
      $("input.input_phone").val(
        function(i, val){
          console.log(i, val);
        
          let res = validator(val, regexps[1]);
        
          if(res === "isEmpty"){
            console.log(this);
            return say(this, "Fill in this field");
          } else if (!res) {
            return say(this, "Only numbers");
          }
        
          return say(this, val, i);
        }
      );
      
      $("form select").css("backgroundColor", function () {
        if ($(this).val()) return "#C8FFC8";
        else return "#FFC8C8";
      });
    });
  });
