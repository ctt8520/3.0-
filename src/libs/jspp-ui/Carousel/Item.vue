<template>
    <transition>
        <div class="carItem" v-if='selfInex === currentIndex' >
            <slot></slot>
        </div>
    </transition>
    
</template>

<script>
import { getCurrentInstance, reactive ,toRefs,watch} from 'vue'
export default {
    name:'CarItem',
    setup() {
        const Instance = getCurrentInstance()
        const state = reactive({
            selfInex:Instance.vnode.key,
            currentIndex:Instance.parent.ctx.currentIndex,
           
        })


        
        
        watch(()=>Instance.parent.ctx.currentIndex,(value)=>{
            state.currentIndex = value;
        })
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss" scoped>
    .carItem{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        img{
            width: 100%;
            user-select: none;
        }
    }
    .v-enter-active,
    .v-leave-active{
        transition: all .3s linear;
    }

    .v-enter-active{
        transform: translateX(100%);
    }
    .v-enter-to{
        transform: translateX(0);
    }
    .v-leave-active{
        transform: translateX(0);
    }
    .v-leave-to{
        transform: translateX(-100%);
    }
</style>