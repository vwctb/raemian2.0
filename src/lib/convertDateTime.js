// 로컬 스토리지에 JSON 형태로 저장 / 불러오기 / 삭제 헬퍼
const convertDateTime = {
    convert12H: (a) => {
        var time = a; // 'hh:mm' 형태로 값이 들어온다 
        var getTime = time.substring(0, 2); // 시간(hh)부분만 저장 
        var intTime = parseInt(getTime); // int형으로 변환 
        if (intTime < 12 ) { // intTime이 12보다 작으면 
            var str = '오전 '; // '오전' 출력 
        } else { // 12보다 크면 
            var str = '오후 '; // '오후 출력' 
        } // intTime이 12면 변환 후 그대로 12 
        if (intTime == 12) {var cvHour = intTime;} // 나머지경우엔 intTime을 12로 나눈 나머지값이 변환 후 시간이 된다 
        else {var cvHour = intTime%12;} // 'hh:mm'형태로 만들기 
        var res = str + Number(('0' + cvHour).slice(-2))+'시 ' + time.split(':')[1]+'분'; 
        return res; 
    },
    convertDate: (a) => {
        var date = a; // 'yyyy:mm:dd' 형태로 값이 들어온다 
        var getTime = date.split('-'); 
    
        return getTime[0]+'년 '+Number(getTime[1])+'월 '+getTime[2]+'일, '; 
    }
};

export default convertDateTime;



