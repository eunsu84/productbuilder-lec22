const jobs = [
  {
    title: "항해사 (2등급)",
    company: "해오름여객선",
    location: "목포 - 흑산",
    schedule: "격일 근무",
    license: "해기사 2급",
    type: "정규직",
    pay: "월 420만원",
  },
  {
    title: "기관사",
    company: "푸른해협", 
    location: "통영 - 욕지도",
    schedule: "주 5일",
    license: "해기사 3급",
    type: "계약직",
    pay: "월 360만원",
  },
  {
    title: "객실 승무원",
    company: "섬마을라인",
    location: "인천 - 백령",
    schedule: "주 6일",
    license: "서비스 자격",
    type: "정규직",
    pay: "월 280만원",
  },
  {
    title: "갑판원",
    company: "남해스타",
    location: "여수 - 거문",
    schedule: "2교대",
    license: "해기사 4급",
    type: "정규직",
    pay: "월 310만원",
  },
];

const crew = [
  {
    name: "김도현",
    role: "항해사",
    location: "부산",
    experience: "7년",
    license: "해기사 2급",
    availability: "즉시",
  },
  {
    name: "박지은",
    role: "객실 승무원",
    location: "인천",
    experience: "4년",
    license: "서비스 자격",
    availability: "2주 후",
  },
  {
    name: "최윤호",
    role: "기관사",
    location: "여수",
    experience: "5년",
    license: "해기사 3급",
    availability: "협의",
  },
  {
    name: "이수진",
    role: "갑판원",
    location: "목포",
    experience: "3년",
    license: "해기사 4급",
    availability: "즉시",
  },
];

const filters = {
  jobs: {
    listId: "job-list",
    searchId: "job-search",
    selectId: "job-type",
    data: jobs,
    render(item) {
      return `
        <article class="list-item">
          <header>
            <div>
              <h3>${item.title}</h3>
              <div class="meta">${item.company} · ${item.location}</div>
            </div>
            <span class="badge">${item.type}</span>
          </header>
          <div class="meta">${item.schedule} · ${item.license} · ${item.pay}</div>
          <a class="btn ghost" href="post-profile.html">지원 문의</a>
        </article>
      `;
    },
  },
  crew: {
    listId: "crew-list",
    searchId: "crew-search",
    selectId: "crew-role",
    data: crew,
    render(item) {
      return `
        <article class="list-item">
          <header>
            <div>
              <h3>${item.name}</h3>
              <div class="meta">${item.role} · ${item.location}</div>
            </div>
            <span class="badge">${item.availability}</span>
          </header>
          <div class="meta">경력 ${item.experience} · ${item.license}</div>
          <a class="btn ghost" href="contact.html">연락하기</a>
        </article>
      `;
    },
  },
};

function setupFilter({ listId, searchId, selectId, data, render }) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;

  const searchEl = document.getElementById(searchId);
  const selectEl = document.getElementById(selectId);

  function apply() {
    const query = searchEl?.value.trim().toLowerCase() ?? "";
    const selected = selectEl?.value ?? "all";

    const filtered = data.filter((item) => {
      const haystack = Object.values(item).join(" ").toLowerCase();
      const matchesQuery = haystack.includes(query);
      const matchesType = selected === "all" || haystack.includes(selected.toLowerCase());
      return matchesQuery && matchesType;
    });

    listEl.innerHTML = filtered.map(render).join("");
  }

  searchEl?.addEventListener("input", apply);
  selectEl?.addEventListener("change", apply);

  apply();
}

window.addEventListener("DOMContentLoaded", () => {
  setupFilter(filters.jobs);
  setupFilter(filters.crew);
});
