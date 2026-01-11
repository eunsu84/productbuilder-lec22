const urgentJobs = [
  {
    id: 8021,
    title: "[D-2] 여객선 기관장 긴급 모집",
  },
  {
    id: 8020,
    title: "[D-3] 주말 항로 객실 승무원 채용",
  },
  {
    id: 8017,
    title: "[D-5] 남해 항로 2등 항해사 구인",
  },
];

const jobs = [
  {
    id: 7533,
    title: "여객선 항해사(2등급) 모집",
    company: "해오름여객선",
    role: "해기사 / 항해사",
    location: "목포 - 흑산",
    updated: "2026-01-12",
    deadline: "수시모집",
    views: 3639,
    tag: "정규직",
  },
  {
    id: 7532,
    title: "도선선 기관사 모집",
    company: "푸른해협",
    role: "해기사 / 기관사",
    location: "통영 - 욕지도",
    updated: "2026-01-11",
    deadline: "2026-01-31",
    views: 2058,
    tag: "계약직",
  },
  {
    id: 7531,
    title: "객실 승무원 채용 (주 6일)",
    company: "섬마을라인",
    role: "서비스 / 객실",
    location: "인천 - 백령",
    updated: "2026-01-11",
    deadline: "수시모집",
    views: 982,
    tag: "정규직",
  },
  {
    id: 7530,
    title: "갑판원 모집",
    company: "남해스타",
    role: "해상직 / 갑판",
    location: "여수 - 거문",
    updated: "2026-01-10",
    deadline: "2026-01-25",
    views: 1267,
    tag: "정규직",
  },
  {
    id: 7529,
    title: "여객선 조리 담당 구인",
    company: "대양해운",
    role: "조리 / 선내급식",
    location: "부산 - 울릉",
    updated: "2026-01-10",
    deadline: "수시모집",
    views: 719,
    tag: "파트타임",
  },
  {
    id: 7528,
    title: "안전관리 담당자 모집",
    company: "해풍운항",
    role: "육상직 / 안전관리",
    location: "목포",
    updated: "2026-01-09",
    deadline: "2026-01-22",
    views: 455,
    tag: "정규직",
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
    route: "남해권",
  },
  {
    name: "박지은",
    role: "객실 승무원",
    location: "인천",
    experience: "4년",
    license: "서비스 자격",
    availability: "2주 후",
    route: "서해권",
  },
  {
    name: "최윤호",
    role: "기관사",
    location: "여수",
    experience: "5년",
    license: "해기사 3급",
    availability: "협의",
    route: "남해권",
  },
  {
    name: "이수진",
    role: "갑판원",
    location: "목포",
    experience: "3년",
    license: "해기사 4급",
    availability: "즉시",
    route: "서해권",
  },
];

function renderJobRow(item) {
  return `
    <tr>
      <td>${item.id}</td>
      <td>
        <div class="title">${item.title}</div>
        <div class="muted">${item.tag}</div>
      </td>
      <td>${item.company}</td>
      <td>${item.role}</td>
      <td>${item.location}</td>
      <td>${item.updated}<br /><span class="muted">${item.deadline}</span></td>
      <td>${item.views}</td>
    </tr>
  `;
}

function renderCrewRow(item) {
  return `
    <tr>
      <td class="title">${item.name}</td>
      <td>${item.role}</td>
      <td>${item.location}</td>
      <td>${item.experience}</td>
      <td>${item.license}</td>
      <td>${item.availability}</td>
      <td>${item.route}</td>
    </tr>
  `;
}

function setupTicker() {
  const track = document.getElementById("urgent-track");
  if (!track) return;

  const links = urgentJobs
    .map(
      (item) =>
        `<a href="jobs.html">${item.title}</a>`
    )
    .join("");

  track.innerHTML = `${links}${links}`;
}

function setupFilter({ listId, searchId, selectId, data, render, emptyMessage }) {
  const listEl = document.getElementById(listId);
  if (!listEl) return;

  const searchEl = document.getElementById(searchId);
  const selectEl = document.getElementById(selectId);

  function apply() {
    const query = searchEl?.value.trim().toLowerCase() ?? "";
    const selected = selectEl?.value ?? "all";
    const limit = Number(listEl.dataset.limit || 0);
    const emptyColspan = Number(listEl.dataset.emptyColspan || 1);

    const filtered = data.filter((item) => {
      const haystack = Object.values(item).join(" ").toLowerCase();
      const matchesQuery = haystack.includes(query);
      const matchesSelect = selected === "all" || haystack.includes(selected.toLowerCase());
      return matchesQuery && matchesSelect;
    });

    const rows = (limit ? filtered.slice(0, limit) : filtered).map(render).join("");
    listEl.innerHTML = rows || `<tr><td class="empty-row" colspan="${emptyColspan}">${emptyMessage}</td></tr>`;
  }

  searchEl?.addEventListener("input", apply);
  selectEl?.addEventListener("change", apply);

  apply();
}

window.addEventListener("DOMContentLoaded", () => {
  setupTicker();
  setupFilter({
    listId: "job-list",
    searchId: "job-search",
    selectId: "job-role",
    data: jobs,
    render: renderJobRow,
    emptyMessage: "검색 결과가 없습니다.",
  });
  setupFilter({
    listId: "crew-list",
    searchId: "crew-search",
    selectId: "crew-role",
    data: crew,
    render: renderCrewRow,
    emptyMessage: "등록된 프로필이 없습니다.",
  });
});
