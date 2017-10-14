// ==UserScript==
// @name        Pixiv ��ǿ
// @namespace   https://github.com/Ahaochan/Tampermonkey
// @version     0.0.1
// @description ���ι��, �鿴����ͼƬ, �ղ�������, ����gif��github:https://github.com/Ahaochan/Tampermonkey����ӭstar��fork��
// @author      Ahaochan
// @match       *://*.pixiv.net*
// @match       *://*.pixiv.net/**
// @require     https://code.jquery.com/jquery-2.2.4.min.js
// ==/UserScript==

(function ($) {
    'use strict';

    (function () {
        // ɾ�����ģ��
        $('._premium-lead-tag-search-bar').hide();
        $('.popular-introduction-overlay').hide();
    })();


    (function () {
        // ѡ��
        $('.navigation-menu-right').append(
            '<div class="menu-group">' +
            '    <a class="menu-item js-click-trackable-later">' +
            '           <img class="_howto-icon" src="https://source.pixiv.net/www/images/knowhow/icon/howto-brush.svg?20171004">' +
            '           <span class="label">�ղ�������</span>' +
            '           <select id="ahao_favourite_num_select">' +
            '               <option value=""></option>' +
            '               <option value="10000users���">10000users���</option>' +
            '               <option value="5000users���" > 5000users���</option>' +
            '               <option value="1000users���" > 1000users���</option>' +
            '               <option value="500users���"  >  500users���</option>' +
            '               <option value="300users���"  >  300users���</option>' +
            '               <option value="100users���"  >  100users���</option>' +
            '               <option value="50users���"   >   50users���</option>' +
            '           </select>' +
            '   </a>' +
            '</div>');

        // ����Ѿ��������ַ������ڸı�ѡ��ʱֱ������
        $('#ahao_favourite_num_select').on('change', function () {
            var $text = $('#suggest-input');
            if(!!$text.val()){
                $('#suggest-container').submit();
            }
        });

        // ���ύ����ǰ���������ؼ���
        $('#suggest-container').submit(function () {
            var $text = $('#suggest-input');
            var $favourite = $('#ahao_favourite_num_select');
            // ȥ���ɵ�����ѡ��
            $text.val($text.val().replace(/\d*users���/, ''));
            // ����µ�����ѡ��
            $text.val($text.val() + ' ' + $favourite.val());
        });
    })();

    (function () {
        if(window.location.href.indexOf('member_illust.php') === -1){
            return;
        }
        // ���ض�ͼ
        var hasGIF = !!$('div ._ugoku-illust-player-container');
        if(!hasGIF){
            return;
        }

        // ��ȡ����
        var param = $('.bookmark_modal_thumbnail')
            .attr('data-src')
            .match(/img-master\/img([\s\S]*?)_/)
            [1];
        var url = 'https://i.pximg.net/img-zip-ugoira/img'+param+'_ugoira600x600.zip';

        // ������ذ�ť
        $('div .bookmark-container').append(
            '<a href="'+url+'" class="_bookmark-toggle-button add-bookmark">' +
            '   <span class="bookmark-icon"></span><span class="description">���ض�ͼ</span>' +
            '</a>');
    })();

})(jQuery);


