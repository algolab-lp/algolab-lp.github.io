$(function () {
    var CATEGORY_WORD_DELIMITER = "?";

    function setCategoryWord(){
        var sanitize = {
            encode : function (str) {
                return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            },

            decode : function (str) {
                return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
            }
        };
        var word = getCategoryWordFromUrl();
        var sanitizedWord = sanitize.encode(word);
        getCategoryWordSpan().text(sanitizedWord);
        getCategoryWordInput().val(sanitizedWord);
    }


    function hasParameter(){
        return containString(getCurrentUrl(), CATEGORY_WORD_DELIMITER);
    }

    function getCategoryWordSpan() {
        return $('span.category_word');
    }
    function getCategoryWordInput() {
        return $('input#category_word');
    }

    function containString(check_string, target_string) {
        return check_string.indexOf(target_string) !== -1;
    }

    function getCurrentUrl() {
        return window.location.href;
    }

    function invalidCategoryWord(words){
        return words.length < 1 || words[1].length < 1;
    }

    function getCategoryWordFromUrl(){
        var words = getCurrentUrl().split(CATEGORY_WORD_DELIMITER);
        if(invalidCategoryWord(words)){
            return "";
        }
        var word = words[1];
        return decodeURI(word);
    }

    function decode(str){
        return decodeURIComponent(escape(atob(str)))
    }

    function executeMain() {
        if(!hasParameter()){
            return;
        }
        setCategoryWord();
    }

    executeMain();
});