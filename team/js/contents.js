window.addEventListener('load',()=>{
    loadingProgress()
    introEffect()
    whatIsEffect()

    timer()
    circleProgress()

    ticketFlipEffect()
    ticketDragEffect()

    lineUpTextEffect();
    lineUpScrollEffect()

    galleryEffect()

    overViewEffect()

    remoteMenuEffect()

})   

//로딩효과        
function loadingProgress(){
    const loadingText = document.querySelector('.percent');
    const waveText = document.querySelector('.wave');
    const loadingIntro = document.getElementById('loading_intro');
    const loadingContainer = document.getElementById('loading_container');
    const mainContent = document.getElementById('intro_wrap');

    let windowHeight = window.innerHeight;
    let isScrolled = false;
    let isVideoReady = false;

    gsap.set(mainContent, {autoAlpha: 0});
    document.body.style.overflow = 'hidden';

    let waveHeight = 0;
    const maxHeight = 159;
    const heightIncrement = 1.8;

    const interval = setInterval(() => {
        waveHeight += heightIncrement;
        const percent = Math.floor((waveHeight/maxHeight)*100);

        loadingText.textContent = `LOADING ... ${percent}%`;
        const acceleratedHeight = (percent*1000)*(maxHeight/100);
        waveText.style.backgroundSize = `300px ${acceleratedHeight}px`;

        if(waveHeight >= maxHeight){
            clearInterval(interval);
            waveText.style.backgroundSize = '300px 159px';
            loadingText.textContent = 'LOADING ... 100%';

                setTimeout(() => {
                    gsap.to(loadingIntro, {y: '-100%', duration: 1.2, ease: 'power3.inOut', onComplete: () => {
                        loadingIntro.style.display = 'none';
                        isVideoReady = true;
            
                setTimeout(() => {
                    const scrollGuide = document.createElement('div');
                    scrollGuide.className = 'scroll_guide';
                    scrollGuide.innerHTML = 'SCROLL TO CONTINUE';
                    loadingContainer.appendChild(scrollGuide);
                    setTimeout(() => {
                        scrollGuide.classList.add('visible');
                    }, 100);
                }, 500);
                        }
                    });
                }, 1000);
        }
    }, 100);

    window.addEventListener('wheel', (e) => {
        if(isVideoReady && !isScrolled && e.deltaY > 0) {
            isScrolled = true;
    
            gsap.to(loadingContainer, {y: -windowHeight, duration: 1, ease: 'power2.out'});

            gsap.to(mainContent, {y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
                loadingContainer.style.display = 'none';
                document.body.style.overflow = 'auto';
                gsap.to(mainContent,{
                    autoAlpha:1,
                    duration:1
                })
                }
            });
        }
    });
}

// 인트로 스크롤효과
function introEffect(){
    const introWrap=document.querySelector('#intro_wrap')
    const introTitle=document.querySelector('.intro_title');
    const introSubTitle=document.querySelector('.intro_subtitle')
    const leftText=document.querySelector('.subtxt_left')
    const rightText=document.querySelector('.subtxt_right')

    const whatIsSection=document.querySelector('#whatis')

    gsap.set([introTitle, introSubTitle, leftText, rightText],{opacity:0})
    gsap.set(introTitle,{x:-100})
    gsap.set([introSubTitle,leftText,rightText],{y:50})

    gsap.set(whatIsSection,{y:'100vh'})

    let introComplete=false;

    //인트로 타임라인
    const t1=gsap.timeline({
        scrollTrigger:{
            trigger:introWrap,
            start:'top top',
            end:'+=100%',
            scrub:2,
            pin:introWrap,
            pinspacing:true,
            onComplete:()=>{
                introComplete=true;
            }
        }
    });

    t1
        .to(introTitle, {opacity:1, x:0, duration:2, ease:'power2.out'})
        .to(introSubTitle, {opacity:1, y:0, duration:2, ease:'power2.out'}, "-=1")
        .to(leftText, {opacity:1, y:0, duration:2, ease:'power1.out'}, "-=1")
        .to(rightText, {opacity:1, y:0, duration:2, ease:'power1.out'}, "-=1")
        .to({}, {duration:2}) // 잠시 멈춤
        .to(whatIsSection, {y: 0, duration: 2}) // whatis 섹션을 위로 올림
        .to({}, {duration:2});
}

// 시너지영역효과
function whatIsEffect(){
    const whatIsSection=document.querySelector('#whatis')
    const synergyBoxes=document.querySelectorAll('.synergybox')

    synergyBoxes.forEach(box=>{
        const defaultRotation=box.id === 'act2' ? -15 : 15;
        const marker=box.querySelector('.marker, .marker2');

        box.addEventListener('mouseenter',()=>{
            gsap.to(box, {rotation:0, duration:0.5, ease:'power2.out'});

            if(marker){
                marker.classList.remove('inactive');
                marker.classList.add('active');
            }
        });

        box.addEventListener('mouseleave',()=>{
            gsap.to(box, {rotation:defaultRotation, duration:0.5, ease:'power2.out'});

            if(marker){
                marker.classList.remove('active');
                marker.classList.add('inactive');
            }
        });
    });
}

// 타이머 효과
function timer(){
        (function () {
        const second = 1000,
                minute = second * 60,
                hour = minute * 60,
                day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd=String(today.getDate()).padStart(2, "0"),
        mm=String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "07/04/",
        birthday = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
        birthday = dayMonth + nextYear;
    }
    //end
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            if (distance < 0) {
            document.getElementById("countdown").style.display = "none";
            clearInterval(x);
            }
            //seconds
        }, 0)
    }());

    }
    // 원형 효과
    function circleProgress() {
        const progressCircle = document.querySelector('.circle-progress-fill');
        const radius = 325;  // 반지름
        const circumference = 2 * Math.PI * radius;  // 원의 둘레 (2 * π * 반지름)
        const totalTime = 60; // 60초

        // stroke-dasharray 설정
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference; // 처음에는 진행하지 않음

        let startTime = Date.now();

        // 진행 상태 업데이트 함수
        function updateProgress() {
        const elapsedTime = (Date.now() - startTime) / 1000; // 경과 시간 (초)

        // 진행 상태를 계산하고 100%를 넘지 않도록 보장
        const progress = Math.min((elapsedTime / totalTime) * 100, 100); // 100%를 넘지 않게 처리
        
        const offset = circumference - (progress / 100) * circumference; // 채워지는 부분 계산
        progressCircle.style.strokeDashoffset = offset; // stroke-dashoffset으로 진행 상태 업데이트

        if (elapsedTime < totalTime) {
            requestAnimationFrame(updateProgress); // 애니메이션 계속 진행
        } else {
            // 100%에 도달하면 정확히 초기화되도록 처리
            progressCircle.style.transition = 'none'; // 애니메이션 제거
            progressCircle.style.strokeDashoffset = circumference; // 100%에 도달하면 다시 비워놓음

            // 잠시 후에 다시 시작 (0.1초 대기)
            setTimeout(() => {
            startTime = Date.now(); // 시간을 리셋
            requestAnimationFrame(updateProgress); // 무한 반복
            }, 100); // 100ms 후에 다시 시작
        }
        }

        updateProgress(); // 처음 시작

    }

// 티켓뒤집기효과
function ticketFlipEffect() {
    const tickets=document.querySelectorAll('.ticket')


    tickets.forEach(ticket=>{
        const inner=ticket.querySelector('.ticket_inner')

        ticket.addEventListener('mouseenter',()=>{
            inner.style.transform='rotateY(180deg)'
        })

        ticket.addEventListener('mouseleave',()=>{
            inner.style.transform='rotateY(0deg)'
        })
    })
}
// 티켓드래그효과
function ticketDragEffect() {
    const tickets = document.querySelectorAll('.ticket');

    tickets.forEach(ticket => {
    let isDragging = false;
    let startX, startY;
    let currentX = 0, currentY = 0;

    ticket.addEventListener('click', (e)=>{
        event.preventDefault();
    })

    ticket.addEventListener('mousedown', (e) => {
        e.preventDefault(); // 기본 동작 방지
        isDragging = true;
    
        // 현재 transform 값 가져오기
        const computedStyle = window.getComputedStyle(ticket);
        const transform = computedStyle.transform;
        const matrix = new DOMMatrix(transform);
    
        startX = e.clientX - matrix.m41;
        startY = e.clientY - matrix.m42;
    
        ticket.style.zIndex = "1000";
        ticket.style.cursor = "grabbing";
    });

    document.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (!isDragging) return;

        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        // 기존 rotate 값 유지하면서 위치만 변경
        const rotation = ticket.id === 'waterbomtime' || ticket.id === 'more_experience' || ticket.id === 'water_fighting' ? -15 : 15;
        ticket.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotation}deg)`;
        });

        document.addEventListener('mouseup', (e) => {
            e.preventDefault();
            if (!isDragging) return;
            isDragging = false;

            ticket.style.zIndex = "";
            ticket.style.cursor = "";
        });
    });
}



// 라인업 텍스트효과
function lineUpTextEffect() {
    const linUptitle=document.querySelector('.lineup_title')
    const lefTexts=document.querySelectorAll('.lineup_txt_left')
    const rightText=document.querySelector('.lineup_txt_right')

    const left1=lefTexts[0]
    const left2=lefTexts[1]

    gsap.set([linUptitle, left1, left2, rightText], {y:100, opacity:0 });

    const textTl=gsap.timeline({
        scrollTrigger: {
            trigger: '.lineup_txt_wrap',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub:2,
            toggleActions: 'play none none reverse'
        }
    });

    textTl
        .to(linUptitle, {y:0, opacity:1, duration:1, ease: 'power2.out'})
        .to(left1, {y:0, opacity:1, duration:1, ease:'power2.out'}, '-=0.6')
        .to(rightText, { y:0, opacity:1, duration:1, ease:'power2.out'}, '-=0.6')
        .to(left2, { y:0, opacity:1, duration:1, ease:'power2.out'}, '-=0.6');
}


//라인업 아티스트 앨범 스크롤효과
function lineUpScrollEffect(){
    const artistsWrap = document.querySelector('.artists_wrap')
    const lineupSection = document.querySelector('#lineup_wrap')

    const scrollIcon = document.querySelector('.lineup_scroll_wrap .icon');
    const scrollbarWidth = document.querySelector('.lineup_scroll_wrap').offsetWidth - 22;


// 모든 카드 초기 상태 설정 - 작게 시작
    gsap.set('#green_1', {scale:0.3, x:600, opacity:1, z:-500})
    gsap.set('#green_2', { scale:0.3, x:600, opacity:1, z:-500})
    gsap.set('#green_3', { scale:0.3, x:600, opacity:1, z:-500})
    gsap.set('#green_4', { scale:0.3, x:600, opacity:1, z:-500})

    gsap.set('#yellow_1', { scale:0.3, x:-600, opacity:1, z:-500})
    gsap.set('#yellow_2', { scale:0.3, x:-600, opacity:1, z:-500})
    gsap.set('#yellow_3', { scale:0.3, x:-600, opacity:1, z:-500})
    gsap.set('#yellow_4', { scale:0.3, x:-600, opacity:1, z:-500})



    const t2 = gsap.timeline({
        scrollTrigger: {
            trigger: lineupSection,
            start: '50% 20%',
            end: '+=3000',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            toggleActions: 'play none none reverse',

            onUpdate: (self) => {
            // 스크롤 진행도에 따라 아이콘 위치 업데이트
                const progress = self.progress;
                gsap.to(scrollIcon, {
                    x: progress * scrollbarWidth,
                    duration: 0.1,
                    ease: 'none'
                });
            }
        }
    })

    // 애니메이션 시퀀스
    t2
        .to('#green_1', {
            keyframes: [
                { scale:1, x:0, z:0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: -400, opacity: 0, duration: 1.5, ease: 'power2.out' }
            ]
        })
// 첫 번째 노란 카드 (0.3초 딜레이)
        .to('#yellow_1', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: 400, opacity: 0, duration: 1.5, ease: 'power2.out' }
            ]
        }, '-=3.2')
// 두 번째 초록 카드 (0.3초 딜레이)
        .to('#green_2', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: -400, opacity: 0, duration: 1.5, ease: 'power2.out' }
]
        }, '-=3.2')
// 두 번째 노란 카드 (0.3초 딜레이)
        .to('#yellow_2', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: 400, opacity: 0, duration: 1.5, ease: 'power2.out' }
]
        }, '-=3.2')
// 세 번째 초록 카드 (0.3초 딜레이)
        .to('#green_3', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: -400, opacity: 0, duration: 1.5, ease: 'power2.out' }
            ]
        }, '-=3.2')
// 세 번째 노란 카드 (0.3초 딜레이)
        .to('#yellow_3', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: 400, opacity: 0, duration: 1.5, ease: 'power2.out' }
            ]
        }, '-=3.2')
// 네 번째 초록 카드 (0.3초 딜레이)
        .to('#green_4', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: -400, opacity: 0, duration: 1.5, ease: 'power2.out' }
            ]
        }, '-=3.2')
// 네 번째 노란 카드 (0.3초 딜레이)
        .to('#yellow_4', {
            keyframes: [
                { scale: 1, x: 0, z: 0, duration: 2, ease: 'power2.inOut' },
                { scale: 1, x: 0, z: 0, duration: 0.5 },
                { scale: 1.2, x: 400, opacity: 0, duration: 1.5, ease: 'power2.out' }
            ]
        }, '-=3.2')


    document.querySelector('.scrollbar_area').addEventListener('click', (e) => {
        const scrollbar = e.currentTarget;
        const rect = scrollbar.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;

        gsap.to(scrollIcon, {x:clickPosition*scrollbarWidth, duration:0.3, ease:'power2.out'});

        const scrollTrigger = t2.scrollTrigger;
        const start = scrollTrigger.start;
        const end = scrollTrigger.end;
        const totalDistance = end - start;
        const targetScroll = start + (totalDistance * clickPosition);


        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    });

// 아이콘 드래그 기능
    let isDragging = false;

    scrollIcon.addEventListener('mousedown', () => {
        isDragging = true;
        scrollIcon.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const scrollbar = document.querySelector('.lineup_scroll_wrap');
        const rect = scrollbar.getBoundingClientRect();
        const scrollbarWidth = rect.width - 22; // 아이콘 너비 제외

// 아이콘 위치 계산
        let newX = e.clientX - rect.left;
        newX = Math.max(0, Math.min(newX, scrollbarWidth));

// 스크롤 위치 계산 및 적용
        const progress = newX / scrollbarWidth;
        const scrollTrigger = t2.scrollTrigger;
        const targetScroll = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress;

        window.scrollTo({
            top: targetScroll,
            behavior: 'auto'
        });
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        scrollIcon.style.cursor = 'pointer';
    });

}

//2024모먼트
function galleryEffect() {
        const pics = document.querySelectorAll('.picboard_wrap>a');

        // 하나의 타임라인으로 모든 아이템에 애니메이션 적용
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#gallery_2024',
                start: '10% 50%',
                end: '60% 30%',
                scrub: true, // 스크롤에 따라 애니메이션 진행
            }
        });

        pics.forEach((item, index) => {
            // 각 아이템에 대해 일정 시간마다 애니메이션 적용 (딜레이 없이)
            tl.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.5,  // 애니메이션 지속 시간
                delay: index * 0.2  // 딜레이를 적당히 줄여서 적용
            });
        });
    }

//2023오버뷰
function overViewEffect() {
const yearList = document.querySelectorAll('.yearlist li');
const yearImgLists = document.querySelectorAll('.yearimglist');

// 초기 상태 설정 (2023년 선택)
yearList[0].classList.add('selected');
yearImgLists[0].classList.add('active');
yearImgLists[0].classList.remove('inactive');

yearList.forEach((year, index) => {
    year.addEventListener('click', () => {
        // 모든 연도 선택 해제
        yearList.forEach(y => y.classList.remove('selected'));
        
        // 클릭한 연도 선택
        year.classList.add('selected');

        // 모든 이미지 리스트 비활성화
        yearImgLists.forEach(list => {
            list.classList.remove('active');
            list.classList.add('inactive');
        });

        // 선택한 연도의 이미지 리스트 활성화
        yearImgLists[index].classList.add('active');
        yearImgLists[index].classList.remove('inactive');
    });
});
}

function remoteMenuEffect(){
    const remoteWrap=document.querySelector('#remote_wrap')
    const remoteMenu=document.querySelector('#remote_control')
    const remoteMenuLi=document.querySelectorAll('#remote_control>li')

    let isOpenMenu=false;
    let isCloseMenu=false;

    remoteWrap.addEventListener('click', showRemoteMenu)

    function showRemoteMenu(){
        if(!isOpenMenu){
        gsap.set(remoteWrap, {overflow:'visible', duration:0.3, ease:'power1.out'})
            isOpenMenu=true;
        }else{
            gsap.set(remoteWrap, {overflow:'hidden', duration:0.3, ease:'power1.out'})
            isOpenMenu=false;
    }
    }

}