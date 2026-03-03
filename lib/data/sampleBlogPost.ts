import { BlogPost } from '@/lib/types/blog'

// Reference post shown when the blog has no published entries yet.
export const sampleBlogPost: BlogPost = {
  id: 'sample-welcome-to-bnomad',
  slug: 'welcome-to-bnomad',
  title: {
    en: 'Welcome to BNomad: Building Glocal Ventures with Heart',
    ko: 'BNomad에 오신 것을 환영합니다: 마음을 담은 글로컬 벤처',
  },
  excerpt: {
    en: 'How we blend global perspectives with local roots to launch ventures that feel authentic and human.',
    ko: '글로벌 관점과 로컬 뿌리를 연결해 진정성 있는 벤처를 만드는 우리의 방법을 소개합니다.',
  },
  content: {
    en: `## Why BNomad exists

We started BNomad to prove that meaningful ventures can honor both **global innovation** and **local culture**. From Jeju to the Basque Country, we see every place as a partner, not a backdrop.

### What we work on
- **Programs**: Spain roadtrips, lab tours, and pop-up collaborations that connect curious builders.
- **Spaces**: Jeju Sehwa House, our home base for workshops and deep work.
- **Ventures**: Projects co-created with LEINNers, makers, and local entrepreneurs.

### How we work
1. Listen to the community.
2. Prototype fast, learn faster.
3. Share openly so others can build with us.

> We believe ventures should feel alive — grounded in people, stories, and place.

### What’s next
We’re publishing more behind-the-scenes notes, program recaps, and partner stories. Stay tuned, and reach out if you want to collaborate.`,
    ko: `## BNomad가 존재하는 이유

BNomad는 **글로벌 혁신**과 **로컬 문화**가 함께할 때 더 의미 있는 벤처가 탄생한다고 믿습니다. 제주에서 바스크까지, 우리는 모든 장소를 배경이 아닌 파트너로 대합니다.

### 우리가 하는 일
- **프로그램**: 스페인 로드트립, 랩 투어, 팝업 협업 등 호기심 많은 빌더를 잇는 여정.
- **공간**: 워크숍과 깊은 협업을 위한 제주 세화 하우스.
- **벤처**: 레이너, 메이커, 로컬 창업가와 함께 만드는 프로젝트.

### 우리의 방식
1. 커뮤니티의 목소리를 먼저 듣습니다.
2. 빠르게 프로토타입하고 더 빠르게 배우는 것을 반복합니다.
3. 모두가 함께 만들 수 있도록 과정을 투명하게 공유합니다.

> 벤처는 사람과 이야기, 그리고 장소에 뿌리를 둘 때 살아 숨 쉰다고 믿습니다.

### 앞으로
프로그램 회고, 파트너 스토리, 비하인드 노트를 더 자주 나눌 예정입니다. 함께 만들고 싶다면 언제든 연락 주세요.`,
  },
  author: {
    name: 'BNomad Team',
    email: 'info@bnomad.co',
  },
  category: 'journey',
  tags: ['glocal', 'community', 'venture-studio'],
  coverImage:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  featured: true,
  published: true,
  publishedAt: new Date('2024-02-15T09:00:00Z'),
  createdAt: new Date('2024-02-10T09:00:00Z'),
  updatedAt: new Date('2024-02-15T09:00:00Z'),
}
