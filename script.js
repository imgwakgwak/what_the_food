let currentCategory = "korean";

const foods = {
    korean: ["김치찌개","된장찌개","불고기","비빔밥","삼겹살","갈비탕","설렁탕","순대국",
        "감자탕","제육볶음","찜닭","부대찌개","떡볶이","닭강정","냉면","갈비찜",
        "삼계탕","김밥","잔치국수","육개장"],

    chinese: ["짜장면","짬뽕","탕수육","마라탕","마라샹궈","꿔바로우","짜장밥",
        "볶음밥","딤섬","유산슬","깐풍기","라조기","팔보채","샤오롱바오",
        "우육면","잡채밥","어향가지","하얀짬뽕","울면","만두"],

    japanese: ["초밥","라멘","우동","돈카츠","규동","가츠동","야키니쿠",
        "타코야키","오니기리","카레라이스","텐동","샤부샤부","사케동",
        "히레카츠","오므라이스","오코노미야키","소바","규카츠",
        "카라아게","스키야키"],

    western: ["피자","파스타","스테이크","햄버거","샐러드","리조또","감바스",
        "그라탱","필라프","미트볼","바베큐","핫도그","클럽샌드위치",
        "치킨파마산","포크립","프렌치프라이","크림스프"]
};

/* ==========================
   테마 업데이트
   ========================== */
function updateThemeClass(cat) {
    const body = document.body;

    body.classList.remove(
        "theme-korean","theme-chinese",
        "theme-japanese","theme-western",
        "rainbow-mode"
    );

    switch (cat) {
        case "korean":  body.classList.add("theme-korean"); break;
        case "chinese": body.classList.add("theme-chinese"); break;
        case "japanese": body.classList.add("theme-japanese"); break;
        case "western": body.classList.add("theme-western"); break;
    }
}

/* ==========================
   카테고리 선택
   ========================== */
function setCategory(cat, btn) {
    currentCategory = cat;
    updateThemeClass(cat);

    // 기존 버튼 비활성화
    document.querySelectorAll(".category-btn")
        .forEach(b => b.classList.remove("category-active"));

    // 현재 버튼 활성화
    btn.classList.add("category-active");

    // ⭐ 추천 버튼 활성화
    document.getElementById("recommendBtn").disabled = false;
}

/* 팝 애니메이션 */
function applyPopAnimation() {
    const box = document.getElementById("result");
    box.classList.remove("pop");
    void box.offsetWidth;
    box.classList.add("pop");
}

function currentCategoryName() {
    return {
        korean: "한식",
        chinese: "중식",
        japanese: "일식",
        western: "양식"
    }[currentCategory];
}

/* ==========================
   카테고리 랜덤 추천
   ========================== */
function recommend() {
    const list = foods[currentCategory];
    const pick = list[Math.floor(Math.random()*list.length)];

    document.getElementById("result").innerHTML = `
        <h2>${pick}</h2>
        <p>${currentCategoryName()} 메뉴 추천입니다.</p>
    `;

    saveRecent(pick, currentCategoryName());
    renderRecent();
    applyPopAnimation();
}

/* ==========================
   완전 랜덤 추천
   ========================== */
function recommendAll() {
    const all = [
        ...foods.korean.map(f => ({name:f,cat:"한식"})),
        ...foods.chinese.map(f => ({name:f,cat:"중식"})),
        ...foods.japanese.map(f => ({name:f,cat:"일식"})),
        ...foods.western.map(f => ({name:f,cat:"양식"}))
    ];

    const pick = all[Math.floor(Math.random()*all.length)];

    document.body.classList.remove(
        "theme-korean","theme-chinese",
        "theme-japanese","theme-western"
    );
    document.body.classList.add("rainbow-mode");

    // 카테고리 비활성화
    document.querySelectorAll(".category-btn")
        .forEach(btn => btn.classList.remove("category-active"));

    // ★ 추천 버튼 비활성화
    document.getElementById("recommendBtn").disabled = true;

    document.getElementById("result").innerHTML = `
        <h2>${pick.name}</h2>
        <p>${pick.cat} 메뉴 중 랜덤 추천입니다.</p>
    `;

    saveRecent(pick.name, pick.cat);
    renderRecent();
    applyPopAnimation();
}

/* ==========================
   최근 추천 저장∙표시
   ========================== */
function saveRecent(name, cat) {
    let recent = JSON.parse(localStorage.getItem("recentFoods")) || [];
    recent.unshift({name, cat});
    recent = recent.slice(0,3);
    localStorage.setItem("recentFoods", JSON.stringify(recent));
}

function renderRecent() {
    let recent = JSON.parse(localStorage.getItem("recentFoods")) || [];
    const box = document.getElementById("recent-list");

    if (recent.length===0) {
        box.innerHTML = `<div class="recent-item">아직 추천 기록이 없습니다.</div>`;
        return;
    }

    box.innerHTML = recent
        .map(r => `<div class="recent-item">• [${r.cat}] ${r.name}</div>`)
        .join("");
}
