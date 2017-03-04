var app = new Vue({
    el: '#app', 
    data: {
        min: '',
        max: '',
        amount: '',
        warn: '',
        lotteryNumner: [],
        result : ''
    },
    methods: {
        lottery: function(){
            var vm = this,
                limit,
                randNum;

            if(vm.max!='' && vm.min!=''){
                limit = (vm.max - vm.min) + 1;
            }
            

            // 沒有輸入的狀態卻按了送出鈕
            if((vm.amount==='' || vm.max==='') || (vm.amount==='' || vm.min==='') || (vm.max==='' || vm.min==='') || (vm.amount==='' && vm.max==='' && vm.min==='')){
                vm.warn = '你還有地方沒輸入哦！！';
            } // 輸入的數字有誤
            else if( parseInt(vm.max) <= parseInt(vm.min) ){
                vm.warn = '「最大數字」必須大於「最小數字」，請重新輸入';
                vm.result = '';
            } // 輸入的數量太少
            else if( limit < parseInt(vm.amount) ){
                vm.warn = '抽獎的數量必須介於「最大數字」-「最小數字」的數量，請重新輸入';
                vm.result = '';
            }else{
                vm.warn = '';
                vm.amount = parseInt(vm.amount);
                vm.max = parseInt(vm.max);
                vm.min = parseInt(vm.min);

                // 每次執行時，清空才能放東西進去 -> 應該有更好的作法(?)
                vm.lotteryNumner = [];
                vm.result = '';


                //上面驗證完後，開始抽獎囉
                for(var i=0; i<vm.amount; i++){
                    randNum = Math.round(vm.min + Math.random() * (vm.max- vm.min));
                    
                    for(var j=0; j<vm.amount; j){
                        if(randNum == vm.lotteryNumner[j]){
                            randNum = Math.round(vm.min + Math.random() * (vm.max- vm.min));
                        }
                        j++;
                    }
                    vm.lotteryNumner[i] = randNum;
                }

                vm.lotteryNumner = vm.lotteryNumner.toString();
                lotto_obj = vm.lotteryNumner.split(',');
                for(var i=0; i<lotto_obj.length; i++){
                    // lotto_obj[i] = lotto_obj[i];
                    if(lotto_obj[i].length==1){
                        lotto_obj[i] = '0'+ lotto_obj[i];
                    }
                }

                // 依序：小-大，就加sort()
                // vm.result = lotto_obj.sort();

                // 亂數排列
                vm.result = lotto_obj;
                vm.result = vm.result.join('、');
                
            }

            T = setTimeout(function(){vm.lottery()}, 30);
        },
        stopIt: function(){
            setTimeout('clearTimeout(T)', 500);
        }
    }
});

var handle = function(){
    app.lottery();
    app.stopIt();
}
