<template>
    <div class="carousel" @mouseenter="enter()" @mouseleave="leave()" @touchstart='touchstart' @touchend='touchend'
        @touchmove='touchmove' @mousedown='mousedown' @mouseup='mouseup'>
        <div class="inner">
            <CarDot :hasDot='hasDot' :dotBgColor='dotBgColor' :itemLen='itemLen' :currentIndex='currentIndex'
                @dotClick='dotClick' />
            <Director dir='next' :isShow='DirectorShow' @dirClick='dirClick' v-show='isShowDir' />
            <Director dir='prev' :isShow='DirectorShow' @dirClick='dirClick' v-show='isShowDir' />
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import {
        reactive,
        toRefs,
        getCurrentInstance,
        onMounted,
        onBeforeUnmount
    } from 'vue'
    import CarDot from './Dot'
    import Director from './Director'
    export default {
        name: 'Carousel',
        components: {
            CarDot,
            Director
        },
        props: {
            autoplay: {
                type: Boolean,
                default: true
            },
            duration: {
                type: Number,
                default: 3000
            },
            initial: {
                type: Number,
                default: 0
            },
            hasDot: {
                type: Boolean,
                default: true
            },
            hasDirector: {
                type: Boolean,
                default: true
            },
            dotBgColor: String,
            DirectorShow: {
                type: Boolean,
                default: true
            },
            isTouch: {
                type: Boolean,
                default: true
            }
        },
        setup(props) {
            const Instance = getCurrentInstance()
            const state = reactive({
                currentIndex: props.initial,
                itemLen: 0,
                isShowDir: false,
                touchstartX: 0,
                touchendX: 0,
                mousedownX: 0,
                mouseupX: 0
            })

            let t = null;

            const autoPlay = () => {
                if (props.autoplay) {
                    t = setInterval(() => {
                        steIndex('next')
                    }, props.duration)
                }
            }
            const dotClick = (index) => {
                state.currentIndex = index;
            }
            const dirClick = (dir) => {
                steIndex(dir)
            }
            const steIndex = (dir) => {
                switch (dir) {
                    case 'next':
                        state.currentIndex += 1;
                        if (state.currentIndex == state.itemLen) {
                            state.currentIndex = 0;
                        }
                        break
                    case 'prev':
                        state.currentIndex -= 1;
                        if (state.currentIndex == -1) {
                            state.currentIndex = 4
                        }
                }

            }
            const enter = () => {
                StopAitoplay()
            }


            const StopAitoplay = () => {
                if (props.DirectorShow) {
                    state.isShowDir = true
                }

                clearInterval(t)
                t = null
            }

            const leave = () => {
                state.isShowDir = false
                autoPlay()
            }


            const touchstart = (ev) => {
                console.log(ev.changedTouches[0].pageX, 'touchstart')
                state.touchstartX = ev.changedTouches[0].pageX
            }
            const touchend = (ev) => {
                if (props.isTouch) {
                    state.touchendX = ev.changedTouches[0].pageX
                    if (state.touchstartX > state.touchendX) {
                        steIndex('next')
                    } else if (state.touchstartX < state.touchendX) {
                        steIndex('prev')
                    }
                }

            }

            const mousedown = (ev) => {
                state.mousedownX = ev.pageX;
                console.log(ev, 'mousedown')
            }

            const mouseup = (ev) => {
                if (props.isTouch) {
                    state.mouseupX = ev.pageX;
                    if (state.mousedownX > state.mouseupX) {
                        steIndex('next')
                    } else if (state.mousedownX < state.mouseupX) {
                        steIndex('prev')
                    }
                }

            }
            onMounted(() => {
                state.itemLen = Instance.slots.default()[0].children.length;
                autoPlay()
            })
            onBeforeUnmount(() => {
                StopAitoplay()
            })

            return {
                ...toRefs(state),
                enter,
                leave,
                dotClick,
                dirClick,
                touchstart,
                touchend,
                mousedown,
                mouseup
            }
        }
    }
</script>
<style lang="scss" scoped>
    .carousel {
        width: 100%;
        height: 100%;
        user-select: none;

        .inner {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }
    }
</style>