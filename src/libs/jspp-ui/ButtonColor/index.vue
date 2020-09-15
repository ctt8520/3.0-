<template>
    <div>
        <div 
            :calss='type'
        >
            <slot></slot>
        </div>
        <!-- sizebtn == "lg"? "lg":sizebtn == "sm"?"sm":sizebtn == "xm"?"xm":"lg" -->
    </div>
</template>
<script>
    import {reactive , toRefs} from 'vue'
    export default {
        name:'ButtonColor', 
        props:{
            type:{
                type:String,
                default:'success'
            },
            size:{
                type:String,
                default:'lg'
            }
        },
        setup(props) {
            const state = reactive({
                sizebtn:props.size
            })
            return {
                ...toRefs(state)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .success{
        width: 170px;
        height: 40px;
        line-height: 40px;
        background: green;
    }
</style>