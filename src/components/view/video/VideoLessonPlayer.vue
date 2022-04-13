<template>
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-16-9"></video>
</template>

<script>
import videojs from "video.js"
import 'video.js/dist/video-js.css'

export default {
    name: "VideoLessonPlayer",
    mounted() {
        
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    },
    methods: {
        init(id_of_video, videoSrc){
            this.video.id = id_of_video;
            this.video.src = videoSrc;
            this.options.sources[0].src = this.$store.state.apiDomain + videoSrc;
            this.initPlayer();
            console.log("id_of_video: " + id_of_video);
        },
        controlSpeed(v, el) {
            this.designControlpeed();
            this.player.playbackRate(v);
            el.classList.add("active");
        },
        designControlpeed() {
            var els = document.getElementById("divControlSpeed").getElementsByTagName("div");
            for (var i = 0; i < els.length; i++) {
                els[i].classList.remove("active");
            }
            /*
            els = document.getElementById("divSpeedMobileCollapse").getElementsByTagName("div");
            for (i = 0; i < els.length; i++) {
                els[i].classList.remove("active");
            }
            */
        },
        controlRewind(isForward) {
            this.player.currentTime(this.player.currentTime() + (isForward ? 10 : -10));
        },
        playerStatusFlipChange(btnEl) {
            var video = document.getElementsByTagName("video")[0];
            if (this.playerStatusFlip) {
                video.classList.remove("flip");
                btnEl.removeClass("active");
            } else {
                video.classList.add("flip");
                btnEl.addClass("active");
            }
            this.playerStatusFlip = !this.playerStatusFlip;
        },
        controlSpeedVisual() {
            if (this.isDivControlSpeedActive) return;
            document.getElementById("divControlSpeed").classList.add("active");
            setTimeout(function () {
                document.getElementById("divControlSpeed").classList.remove("active");
                this.isDivControlSpeedActive = false;
            }, 1500);
        },
        initPlayer(){
            
            var _vue = this;
            this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                console.log('onPlayerReady', this);
            })
            
            var btnControlBackward = this.player.addChild('button');
            btnControlBackward.addClass("html-classname");
            btnControlBackward.addClass("backward");
            var myButtonDom0 = btnControlBackward.el();
            var svgEl0 = '<svg version="1.1" width="30px" height="30px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 100.11" style="enable-background:new 0 0 122.88 100.11" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><polygon class="st0" points="0,49.67 65.54,100.11 65.54,55.97 122.88,100.11 122.88,0 65.54,43.46 65.54,0 0,49.67"/></g></svg>';
            myButtonDom0.innerHTML = svgEl0 + "<p>Назад</p>";
            btnControlBackward.on('click', function () {
                _vue.controlRewind(false);
            });


            var btnControlForward = this.player.addChild('button');
            btnControlForward.addClass("html-classname");
            btnControlForward.addClass("forward");
            var myButtonDom1 = btnControlForward.el();
            var svgEl1 = '<svg version="1.1" width="30px" height="30px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 100.11" style="enable-background:new 0 0 122.88 100.11" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><polygon class="st0" points="122.88,49.67 57.34,100.11 57.34,55.97 0,100.11 0,0 57.34,43.46 57.34,0 122.88,49.67"/></g></svg>';
            myButtonDom1.innerHTML = svgEl1 + "<p>Вперед</p>";
            btnControlForward.on('click', function () {
                _vue.controlRewind(true);
            });




            var btnControlFlip = this.player.addChild('button');

            btnControlFlip.addClass("html-classname");
            btnControlFlip.addClass("second");
            var myButtonDom2 = btnControlFlip.el();
            var svgEl2 = '<svg width="30px" height="30px" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" color="champYellow.2" class="sc-cIShpX sc-ccLTTT jRmGLG"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 2.36131C0.5 1.33334 1.44896 0.5 2.61957 0.5H11.3804C12.551 0.5 13.5 1.33334 13.5 2.36131V15.6387C13.5 16.6667 12.551 17.5 11.3804 17.5H2.61957C1.44896 17.5 0.5 16.6667 0.5 15.6387V2.36131ZM2.61957 1.74088C2.22936 1.74088 1.91304 2.01866 1.91304 2.36131V15.6387C1.91304 15.9813 2.22936 16.2591 2.61957 16.2591H11.3804C11.7706 16.2591 12.087 15.9813 12.087 15.6387V2.36131C12.087 2.01866 11.7706 1.74088 11.3804 1.74088H2.61957Z" fill="currentColor"></path><path d="M2.76123 8.89476V14.2737C2.76123 14.9591 3.39387 15.5146 4.17427 15.5146H9.82645C10.6068 15.5146 11.2395 14.9591 11.2395 14.2737V3.72629C11.2395 3.10573 10.7208 2.59157 10.0433 2.49994L2.76123 8.89476Z" fill="currentColor"></path><path d="M7.86168 2.48541H4.17427C3.39387 2.48541 2.76123 3.04097 2.76123 3.72629V6.96441L7.86168 2.48541Z" fill="currentColor"></path></svg>';

            svgEl2 = '<svg version="1.1" width="30px" height="30px" fill="none" viewBox="0 0 512 512" xml:space="preserve"> <path fill-rule="evenodd" clip-rule="evenodd" d="M256,0c-8.284,0-15,6.716-15,15v70c0,8.284,6.716,15,15,15s15-6.716,15-15V15C271,6.716,264.284,0,256,0z" fill="currentColor" /> <path d="M256,137c-8.284,0-15,6.716-15,15v70c0,8.284,6.716,15,15,15s15-6.716,15-15v-70C271,143.716,264.284,137,256,137z" fill="currentColor" /> <path d="M256,275c-8.284,0-15,6.716-15,15v70c0,8.284,6.716,15,15,15s15-6.716,15-15v-70C271,281.716,264.284,275,256,275z" fill="currentColor" /> <path d="M256,412c-8.284,0-15,6.716-15,15v70c0,8.284,6.716,15,15,15s15-6.716,15-15v-70C271,418.716,264.284,412,256,412z" fill="currentColor" /> <path d="M179.402,103.503l-120-36.842c-4.549-1.398-9.491-0.552-13.317,2.276C42.258,71.765,40,76.241,40,81v350 c0,4.759,2.258,9.235,6.085,12.063c3.841,2.839,8.787,3.668,13.317,2.275l120-36.842c6.299-1.933,10.598-7.751,10.598-14.339 V117.842C190,111.254,185.7,105.437,179.402,103.503z M160,383.071l-90,27.632V101.296l90,27.632V383.071z" fill="currentColor" /> <path d="M465.915,68.937c-3.827-2.828-8.769-3.674-13.317-2.276l-120,36.842c-6.299,1.933-10.598,7.751-10.598,14.339v276.316 c0,6.588,4.3,12.405,10.598,14.339l120,36.842c4.566,1.402,9.505,0.541,13.317-2.276C469.742,440.235,472,435.759,472,431V81 C472,76.241,469.742,71.765,465.915,68.937z M442,410.704l-90-27.632V128.928l90-27.632V410.704z" fill="currentColor" /> </svg>';
            myButtonDom2.innerHTML = svgEl2 + "<p>Отзеркалить</p>";
            btnControlFlip.on('click', function () {
                _vue.playerStatusFlipChange(btnControlFlip);
            });

            
            var btnControlSpeed = this.player.addChild('button');
            btnControlSpeed.addClass("html-classname");
            btnControlSpeed.addClass("third");
            var myButtonDom3 = btnControlSpeed.el();

            /*
            var divControlSpeedBlockForAll = document.createElement("div");
            divControlSpeedBlockForAll.id = "divControlSpeed";
            divControlSpeedBlockForAll.className = "control-speed";
            divControlSpeedBlockForAll.onmouseover = function(){
                _vue.controlSpeedVisual();
            };
            divControlSpeedBlockForAll.onmousemove = function(){
                _vue.controlSpeedVisual();
            };

            //var divControlSpeed;
            var listOfSpeed = [2.0,1.75,1.5,1.25,1.0,0.75,0.5];
            for(var i = 0; i < listOfSpeed.length; i++){
                var divControlSpeed = document.createElement("div");
                divControlSpeed.onclick = function(){
                    console.log(123);
                    //_vue.controlSpeed(listOfSpeed[i], this);
                };
                divControlSpeed.innerHTML = listOfSpeed[i] + "x";
                divControlSpeedBlockForAll.appendChild(divControlSpeed);
            }
            */
            //myButtonDom3.appendChild(divControlSpeedBlockForAll);
            
        /*
                var divControlSpeed = this.player.addChild('button');
                divControlSpeed.on("click", function(){
                    console.log(2);
                    //_vue.controlSpeed(listOfSpeed[i], this);
                });
                divControlSpeed.innerHTML = "2x";
                //divControlSpeedBlockForAll.appendChild(divControlSpeed);
                */
            /*
            var divControlSpeedBlockForAll = this.player.addChild('button');
            divControlSpeedBlockForAll.id = "divControlSpeed";
            divControlSpeedBlockForAll.addClass("control-speed");
            divControlSpeedBlockForAll.on("mouseover", function(){
                _vue.controlSpeedVisual();
            });
            divControlSpeedBlockForAll.on("mousemove", function(){
                _vue.controlSpeedVisual();
            });
            var listOfSpeed = [2.0,1.75,1.5,1.25,1.0,0.75,0.5];
            for(var i = 0; i < listOfSpeed.length; i++){
                var divControlSpeed = divControlSpeedBlockForAll.addChild("button");
                divControlSpeed.on("click", function(){
                    console.log(listOfSpeed[i]);
                    //_vue.controlSpeed(listOfSpeed[i], this);
                });
                divControlSpeed.innerHTML = listOfSpeed[i] + "x";
            }
            */

            //var divControlSpeedBlockForAll = document.createElement("div");
            //divControlSpeedBlockForAll.id = "divControlSpeed";
            //divControlSpeedBlockForAll.className = "control-speed";
            //this.player.el().appendChild(divControlSpeedBlockForAll);


            //var component0 = new Component(this.player, divControlSpeedBlockForAll);

            //console.log(divControlSpeedBlockForAll.outerHTML);

            var svgEl3 = '<div class="control-speed" id="divControlSpeed" onmouseover="controlSpeedVisual()" onmousemove="controlSpeedVisual()"><div onclick="controlSpeed(2.0,this)">2x</div><div onclick="controlSpeed(1.75,this)">1.75x</div><div onclick="controlSpeed(1.5,this)">1.5x</div><div class="active" onclick="controlSpeed(1.0,this)">1x</div><div onclick="controlSpeed(0.75,this)">0.75x</div><div onclick="controlSpeed(0.5,this)">0.5x</div></div><svg width="30px" height="30px" fill="none" viewBox="0 0 305 305" style="enable-background:new 0 0 305 305;" xml:space="preserve"> <path d="M305,173.726c0-41.662-16.799-79.469-43.972-107.02c-0.212-0.282-0.438-0.558-0.695-0.815 c-0.257-0.257-0.532-0.483-0.814-0.694C231.968,38.024,194.161,21.226,152.5,21.226c-41.661,0-79.468,16.799-107.02,43.971 c-0.282,0.212-0.557,0.438-0.814,0.694c-0.257,0.257-0.483,0.532-0.695,0.815C16.799,94.257,0,132.064,0,173.726 c0,40.729,15.859,79.018,44.655,107.821c0.004,0.004,0.008,0.009,0.012,0.013c0.003,0.002,0.005,0.005,0.008,0.007 c0.004,0.004,0.008,0.008,0.012,0.012c1.464,1.464,3.383,2.195,5.302,2.195c1.92,0,3.84-0.732,5.304-2.197 c0.125-0.125,0.238-0.258,0.352-0.39l23.112-23.113c2.929-2.93,2.929-7.678,0-10.607c-2.929-2.928-7.678-2.928-10.606,0 l-18.036,18.036c-21.031-23.403-33.232-52.857-34.91-84.277h25.507c4.142,0,7.5-3.357,7.5-7.5s-3.358-7.5-7.5-7.5H15.207 c1.744-32.272,14.668-61.618,34.957-84.229l17.987,17.987c1.464,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.303-2.196 c2.929-2.93,2.929-7.678,0-10.607L60.771,71.389C83.383,51.1,112.728,38.176,145,36.433v25.506c0,4.143,3.358,7.5,7.5,7.5 s7.5-3.357,7.5-7.5V36.433c32.272,1.743,61.617,14.668,84.229,34.957l-17.987,17.987c-2.929,2.93-2.929,7.678,0,10.607 c1.464,1.464,3.384,2.196,5.303,2.196s3.839-0.732,5.303-2.196l17.987-17.987c20.289,22.612,33.214,51.957,34.957,84.229h-25.506 c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h25.507c-1.678,31.42-13.878,60.875-34.909,84.278l-18.036-18.037 c-2.928-2.928-7.677-2.928-10.606,0c-2.929,2.93-2.929,7.678,0,10.607l23.485,23.485c1.464,1.464,3.384,2.196,5.303,2.196 c0.959,0,1.919-0.183,2.822-0.549c0.903-0.366,1.749-0.915,2.482-1.647C289.137,252.755,305,214.459,305,173.726z" fill="currentColor" /> <path d="M186.956,87.718c-3.847-1.541-8.211,0.327-9.751,4.173l-21.673,54.1 c-1.01-0.108-2.02-0.182-3.031-0.182c-10.556,0-20.091,5.847-24.886,15.259c-5.012,9.839-3.728,21.595,3.432,31.445 c0.732,1.007,1.652,1.928,2.666,2.665c5.817,4.229,12.314,6.464,18.788,6.464c10.556,0,20.092-5.847,24.886-15.259 c5.012-9.839,3.728-21.594-3.427-31.437c-0.732-1.01-1.654-1.934-2.671-2.674c-0.547-0.398-1.106-0.761-1.665-1.123l21.505-53.681 C192.669,93.624,190.801,89.258,186.956,87.718z M164.02,179.574c-2.221,4.359-6.635,7.067-11.52,7.067 c-3.204,0-6.429-1.119-9.589-3.327c-3.6-5.169-4.307-10.773-1.93-15.438c2.22-4.359,6.634-7.067,11.52-7.067 c1.558,0,3.12,0.27,4.678,0.795c0.051,0.021,0.098,0.048,0.15,0.069c0.164,0.065,0.329,0.118,0.494,0.171 c1.43,0.549,2.854,1.305,4.266,2.291C165.688,169.304,166.396,174.909,164.02,179.574z" fill="currentColor" /> </svg>';

            svgEl3 = '<div class="control-speed" id="divControlSpeed"><div>2x</div><div>1.75x</div><div>1.5x</div><div class="active">1x</div><div>0.75x</div><div>0.5x</div></div><svg width="30px" height="30px" fill="none" viewBox="0 0 305 305" style="enable-background:new 0 0 305 305;" xml:space="preserve"> <path d="M305,173.726c0-41.662-16.799-79.469-43.972-107.02c-0.212-0.282-0.438-0.558-0.695-0.815 c-0.257-0.257-0.532-0.483-0.814-0.694C231.968,38.024,194.161,21.226,152.5,21.226c-41.661,0-79.468,16.799-107.02,43.971 c-0.282,0.212-0.557,0.438-0.814,0.694c-0.257,0.257-0.483,0.532-0.695,0.815C16.799,94.257,0,132.064,0,173.726 c0,40.729,15.859,79.018,44.655,107.821c0.004,0.004,0.008,0.009,0.012,0.013c0.003,0.002,0.005,0.005,0.008,0.007 c0.004,0.004,0.008,0.008,0.012,0.012c1.464,1.464,3.383,2.195,5.302,2.195c1.92,0,3.84-0.732,5.304-2.197 c0.125-0.125,0.238-0.258,0.352-0.39l23.112-23.113c2.929-2.93,2.929-7.678,0-10.607c-2.929-2.928-7.678-2.928-10.606,0 l-18.036,18.036c-21.031-23.403-33.232-52.857-34.91-84.277h25.507c4.142,0,7.5-3.357,7.5-7.5s-3.358-7.5-7.5-7.5H15.207 c1.744-32.272,14.668-61.618,34.957-84.229l17.987,17.987c1.464,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.303-2.196 c2.929-2.93,2.929-7.678,0-10.607L60.771,71.389C83.383,51.1,112.728,38.176,145,36.433v25.506c0,4.143,3.358,7.5,7.5,7.5 s7.5-3.357,7.5-7.5V36.433c32.272,1.743,61.617,14.668,84.229,34.957l-17.987,17.987c-2.929,2.93-2.929,7.678,0,10.607 c1.464,1.464,3.384,2.196,5.303,2.196s3.839-0.732,5.303-2.196l17.987-17.987c20.289,22.612,33.214,51.957,34.957,84.229h-25.506 c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h25.507c-1.678,31.42-13.878,60.875-34.909,84.278l-18.036-18.037 c-2.928-2.928-7.677-2.928-10.606,0c-2.929,2.93-2.929,7.678,0,10.607l23.485,23.485c1.464,1.464,3.384,2.196,5.303,2.196 c0.959,0,1.919-0.183,2.822-0.549c0.903-0.366,1.749-0.915,2.482-1.647C289.137,252.755,305,214.459,305,173.726z" fill="currentColor" /> <path d="M186.956,87.718c-3.847-1.541-8.211,0.327-9.751,4.173l-21.673,54.1 c-1.01-0.108-2.02-0.182-3.031-0.182c-10.556,0-20.091,5.847-24.886,15.259c-5.012,9.839-3.728,21.595,3.432,31.445 c0.732,1.007,1.652,1.928,2.666,2.665c5.817,4.229,12.314,6.464,18.788,6.464c10.556,0,20.092-5.847,24.886-15.259 c5.012-9.839,3.728-21.594-3.427-31.437c-0.732-1.01-1.654-1.934-2.671-2.674c-0.547-0.398-1.106-0.761-1.665-1.123l21.505-53.681 C192.669,93.624,190.801,89.258,186.956,87.718z M164.02,179.574c-2.221,4.359-6.635,7.067-11.52,7.067 c-3.204,0-6.429-1.119-9.589-3.327c-3.6-5.169-4.307-10.773-1.93-15.438c2.22-4.359,6.634-7.067,11.52-7.067 c1.558,0,3.12,0.27,4.678,0.795c0.051,0.021,0.098,0.048,0.15,0.069c0.164,0.065,0.329,0.118,0.494,0.171 c1.43,0.549,2.854,1.305,4.266,2.291C165.688,169.304,166.396,174.909,164.02,179.574z" fill="currentColor" /> </svg>';

            myButtonDom3.innerHTML = svgEl3 + "<p>Скорость</p>";


            btnControlSpeed.on("mouseover", function () { _vue.controlSpeedVisual(); });
            btnControlSpeed.on("mousemove", function () { _vue.controlSpeedVisual(); });

            
            var listOfSpeed = [2.0, 1.75, 1.5, 1.0, 0.75, 0.5];
            const divControlSpeedBlockForAll = document.getElementById("divControlSpeed");
            //const divsSpeed = divControlSpeedBlockForAll.getElementsByTagName("div");
            divControlSpeedBlockForAll.getElementsByTagName("div")[0].onclick = function(){
                _vue.controlSpeed(listOfSpeed[0], this);
            };
            divControlSpeedBlockForAll.getElementsByTagName("div")[1].onclick = function(){
                _vue.controlSpeed(listOfSpeed[1], this);
            };
            divControlSpeedBlockForAll.getElementsByTagName("div")[2].onclick = function(){
                _vue.controlSpeed(listOfSpeed[2], this);
            };
            divControlSpeedBlockForAll.getElementsByTagName("div")[3].onclick = function(){
                _vue.controlSpeed(listOfSpeed[3], this);
            };
            divControlSpeedBlockForAll.getElementsByTagName("div")[4].onclick = function(){
                _vue.controlSpeed(listOfSpeed[4], this);
            };
            divControlSpeedBlockForAll.getElementsByTagName("div")[5].onclick = function(){
                _vue.controlSpeed(listOfSpeed[5], this);
            };
        }
    },
    data() {

        document.title = "Урок | 13DANCEONLINE";
        return {
            video: {
                id: 0,
                src: null
            },
            tutorialLessonViewModel: null,
            playerStatusFlip: false,
            isDivControlSpeedActive: false,
            player: null,
            options: {
				autoplay: true,
				controls: true,
				sources: [
					{
						src:
                            //"/uploads/tutorial/1_0927fp4be4ig14kkkspjzx147lu959j4/playlist.m3u8",
                            null,
                            //"https://api-stgonline.ru/uploads/video/24_vu27yy9hozupgmvvnwmielz79vw4dldf/playlist.m3u8",
                        type: "application/x-mpegURL"
					}
				]
			}
        }
    }
}
</script>



<style>

.html-classname {
    text-align: center;
    height: auto!important;
    position: absolute!important;
    /*top:40%;*/
    bottom:12%;
    /*left: 38%;*/
	left: 35%;
    width:80px!important;
    text-shadow: #000 0 0 2px;
    opacity:1;
    visibility: visible;
    transition: all 1s ease-out;
    display: none!important;
    -webkit-appearance: none;
    -moz-appearance: none;
}
.html-classname.second {
    /*left: 46%;*/
	left:43%;
}
.html-classname.third {
    /*left: 54%;*/
	left:50%;
}
.html-classname.backward {
    /*top:40%;*/
    bottom:12%;
    height:70px!important;
}
.html-classname.forward {
    /*top:40%;*/
    bottom:12%;
    height:70px!important;
    /*left: 54%;*/
	left:58%;
}

.vjs_name {
    height: auto;
    text-align: left!important;
    position: absolute!important;
    top:-43%;
    font-size:22px!important;
    left: 4%;
    width:20%!important;
    text-shadow: #000 0 0 2px;
    opacity:1;
    cursor: auto!important;
    visibility: visible;
    transition: all 1s ease-out;
    display: none!important;
}
.vjs-has-started .vjs_name {
    display: inline-block!important;
}
.vjs-fullscreen .vjs_name {
    top:-44%;
}
.vjs-fullscreen .html-classname.backward {
    bottom:11%;
}
.vjs-fullscreen .html-classname.forward {
    bottom:11%;
}
.vjs-fullscreen video {
    height:101%!important;
    width:100%;
}
.vjs-fullscreen .html-classname.second, .vjs-fullscreen .html-classname.third {
    bottom:11%;
}
.video-js .vjs-picture-in-picture-control {
    display: none !important;
}
.video-js .vjs-big-play-button {
    margin-top: 24%;
    margin-left: 44%;
}



.vjs-has-started .html-classname {
    display: inline-block !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.html-classname.active {
    color: #ffd362 !important;
}
.html-classname p {
    margin-top:12px;
}
.vjs-user-inactive .html-classname, .vjs-user-inactive .vjs_name {
    opacity: 0;
    transition: all 1s ease-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.vjs-user-active .html-classname, .vjs-user-active .vjs_name {
    opacity: 1!important;
    transition: all 1s ease-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}






.control-speed {
    display: none;
    background-color: #222222;
    padding: 12px;
    border-radius: 12px;
    position: absolute;
    margin-top: -200%;
    margin-left: -25%;
}
.control-speed.active {
    display:inline-block;
}
.control-speed:hover {
    display:inline-block;
}
.control-speed div {
    background-color: #f9f9f9;
    color:#000;
    padding:4px 12px;
    border-radius: 12px;
    margin-bottom:4px;
    font-size:10px;
    cursor:pointer;
}
.control-speed div:hover {
    background-color: #bababa;
    color:#fff;
}
.control-speed div.active {
    background-color: #3b3b3b;
    color:#fff;
}
</style>