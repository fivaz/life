## [1.1.0](https://github.com/fivaz/life/compare/web-v1.0.1...web-v1.1.0) (2026-01-22)

### ✨ Features

* **svelendar:** add an icon represent when tasks are being fetched ([5706bfa](https://github.com/fivaz/life/commit/5706bfa2574d92fd4b67b21d6543a3f9b14071fb))
* **svelendar:** add aria attributes to fetch icon ([f51d6c5](https://github.com/fivaz/life/commit/f51d6c5b44aa4c8197ad044f208870ac78fb1f99))

### 🐛 Bug Fixes

* **web:** show loading state whether unique or recurrent tasks are being fetched ([c3c1106](https://github.com/fivaz/life/commit/c3c110607d45898de82cdf158878d57f1420794d))

### 🧹 Chores

* (life): update packages with vulnerabilities ([623d66e](https://github.com/fivaz/life/commit/623d66e64855203764175b5ce427d9009ef8389d))
* **life:** remove deprecated libs ([ad5f738](https://github.com/fivaz/life/commit/ad5f738a7b45476267d8ab8062aeecd8b65dff3d))
* **life:** replace lucide-svelte package with @lucide/svelte ([2f5d03a](https://github.com/fivaz/life/commit/2f5d03a946a049aea43a6f762ffdd48483bf96e1))
* **life:** update storybook ([905f22e](https://github.com/fivaz/life/commit/905f22ed960368eb900b96b40e94e1910b89a8aa))
* **svelendar:** add a missing prop in a story ([402fe27](https://github.com/fivaz/life/commit/402fe27eb070a594e18bcb7dd0ae4ab3526e4941))

### 🔨 Code Refactoring

* **life:** move tooltip from web to shared ([f9677b1](https://github.com/fivaz/life/commit/f9677b1a27af68c6f0186a2d0efbb851ef951bfb))

## [1.0.1](https://github.com/fivaz/life/compare/web-v1.0.0...web-v1.0.1) (2026-01-16)

### 👷 Build System

* **life:** remove conflicting cache directories ([320f844](https://github.com/fivaz/life/commit/320f84475366bd95d57fcbfaae05918363d41cc6))

### 🔧 Continuous Integration

* **life:** remove unnecessary cache from semantic release ([96f359b](https://github.com/fivaz/life/commit/96f359b2cdcbc921ef0797b149829c25068e3beb))
* **web:** fix directory changes that trigger the main release ([e1a4958](https://github.com/fivaz/life/commit/e1a49581b60f4bd6417f1ad2652c449cb3452aa4))
* **web:** generate releases for web on chore, docs, style, ci, and refactor commits ([c896b50](https://github.com/fivaz/life/commit/c896b509d25375065f28a3a837c1acc309b78099))

## 1.0.0 (2026-01-16)

### ✨ Features

* **life:** add the possibility to add a category parent to category ([e74acd0](https://github.com/fivaz/life/commit/e74acd09dc751f3cbc42bcbdfe0e16abae2bde0c))
* **svelendar:** add a division for elapsed time and remaining time ([057bb64](https://github.com/fivaz/life/commit/057bb64d3ce2b1cb32be43a5f30b44a3f6d1e534))
* **svelendar:** add a message when day summary total tasks duration surpass 24h ([828a030](https://github.com/fivaz/life/commit/828a030cabc5cf1538b1d14250de700efd552d1c))
* **svelendar:** add DayReview duration legend in the format hh:mm ([e8c92c1](https://github.com/fivaz/life/commit/e8c92c1450a54a83cdefe47ed1ac2473d5cef180))
* **svelendar:** add pie chart representing types of the tasks ([2f770eb](https://github.com/fivaz/life/commit/2f770eb1d6895544ad27115173232dee04730ee7))
* **svelendar:** change DayReview chart colors ([26e4d13](https://github.com/fivaz/life/commit/26e4d13561e9343fa0221e64f63daf2d09abd2aa))
* **svelendar:** make border of summary of day match its color ([220a172](https://github.com/fivaz/life/commit/220a1720be7800b00f3facf975b41752a6f9b6c2))
* **svelendar:** update mobile design of tabs of day summary ([cb55595](https://github.com/fivaz/life/commit/cb55595999b5bd17f1153273dcfb7c5f02ff7411))
* **svelendar:** update tab design and remove shadcn tabs ([e02c28f](https://github.com/fivaz/life/commit/e02c28f5d9ac1ce6cc7ae7a7094f1d3eb67aab29))
* **web:** add app version to side menu ([2841330](https://github.com/fivaz/life/commit/28413301c763e7c7f5cc62e66c541fef915cf6e0))
* **web:** sort tasks of the same period by startTime in tasks page ([3300c6b](https://github.com/fivaz/life/commit/3300c6b9f3412f1098432bb99c7bdcde2a75d93e))
* **web:** use category parents to group tasks in DaySummary ([247db9c](https://github.com/fivaz/life/commit/247db9cdf3d115b362d0fb7ba41dbc537cf15873))

### 🐛 Bug Fixes

* **life:** week selector calendar button wasn't working on mobile ([6c365dc](https://github.com/fivaz/life/commit/6c365dce809c8372e20d81ab7cdefab77c525231))

### ⏪ Reverts

* Revert commits to try to fix the issue with Prisma in Vercel ([8b874d1](https://github.com/fivaz/life/commit/8b874d17d4ffa6a61d62240c8b2d8d94d92889e2))

### 📦 Miscellaneous Chores

* add shadcn tabs ([7cd8c08](https://github.com/fivaz/life/commit/7cd8c0846d932c4cdb1a308bd07b2ef4f285f30d))
* apply formatting ([4a13179](https://github.com/fivaz/life/commit/4a131797f66c3c6b0fc8a6b62635931faea6df2e))
* apply formatting ([edac45e](https://github.com/fivaz/life/commit/edac45e7325b49b1c7bd0843daeac27e6ff3bff6))
* apply formatting ([296c8c3](https://github.com/fivaz/life/commit/296c8c33db94aa117ce0696564bad75af5319479))
* apply formatting ([770d4ad](https://github.com/fivaz/life/commit/770d4ade7a17749122e35998f080c4467887be21))
* apply formatting ([70a4a31](https://github.com/fivaz/life/commit/70a4a31937b80debdfcd0529007a06e231b11aa5))
* apply formatting ([6c53505](https://github.com/fivaz/life/commit/6c5350567ba920e6ec26031649276cbfbdfac739))
* apply formatting ([9d156f6](https://github.com/fivaz/life/commit/9d156f61d9b10a9890e4368fcf831729828a76b5))
* apply formatting ([e143596](https://github.com/fivaz/life/commit/e143596bc641a191aaad40eea54b676009674c4b))
* apply formatting ([0f26cd8](https://github.com/fivaz/life/commit/0f26cd8ff0ca817fcb5584c15f5a865fb8f74f4a))
* apply formatting ([b681335](https://github.com/fivaz/life/commit/b68133575f894f2a628bdc4d79b2b33a4dc5c9a0))
* apply formatting ([d55b269](https://github.com/fivaz/life/commit/d55b269f1fb64d63bd3d1573004c73dd42fc33e6))
* apply formatting ([4f66e1a](https://github.com/fivaz/life/commit/4f66e1aa1782b5de9a7ea99ebb927b3ad1fefd1d))
* apply formatting ([bfc0af0](https://github.com/fivaz/life/commit/bfc0af0fcfed524468e6572419bf8e3b2592818d))
* apply formatting ([6bf4f91](https://github.com/fivaz/life/commit/6bf4f91158da9953301a485bf8b7dc953628e730))
* apply formatting ([247f0bc](https://github.com/fivaz/life/commit/247f0bcedfa3eaed85f28fdbc4af1a1dce557349))
* apply formatting ([13288bc](https://github.com/fivaz/life/commit/13288bcf20e33ce24d04e08385bc8dd39286edc2))
* apply formatting ([0586932](https://github.com/fivaz/life/commit/05869322c585bf3c4ae9a05636b7209f0c84aefc))
* apply formatting ([556178b](https://github.com/fivaz/life/commit/556178be3746dfe3760d2981fbc6337639f0e1c3))
* apply formatting ([dcd21dc](https://github.com/fivaz/life/commit/dcd21dcbbd5a21582731bb19bc6991d77ef34c05))
* apply formatting ([75136e7](https://github.com/fivaz/life/commit/75136e7726d62a91601d01afd07cc8c0fe0f2ea3))
* apply formatting ([beb7755](https://github.com/fivaz/life/commit/beb7755ce95914972a28d490790b018f39882f14))
* apply formatting ([67e897a](https://github.com/fivaz/life/commit/67e897aefa744dd35b4f546c0738c2b7363b1221))
* apply formatting ([893910b](https://github.com/fivaz/life/commit/893910be5d4e43846bf5638769a2b5a3263b83c5))
* apply formatting ([d3e0556](https://github.com/fivaz/life/commit/d3e0556c962c1a56f2a540afa538a1e21dafc25a))
* apply formatting ([2893c8b](https://github.com/fivaz/life/commit/2893c8b614e6185b278421018f5bb87181b72687))
* apply formatting ([91420fc](https://github.com/fivaz/life/commit/91420fcf163270d6fc7f3efcc15076d5b310d49e))
* apply formatting ([bd6ae76](https://github.com/fivaz/life/commit/bd6ae76a6c550f3623cba261a8c6e27ef03f4943))
* apply formatting ([5992c03](https://github.com/fivaz/life/commit/5992c03018ac45d6c6f5a164d60ec62cd24e0f32))
* apply formatting ([57db064](https://github.com/fivaz/life/commit/57db0640d8420906800edd4851691086da02230b))
* apply formatting ([ecab3b7](https://github.com/fivaz/life/commit/ecab3b78e9486998525b646a1b9d3b1a01da1b20))
* apply formatting ([f875969](https://github.com/fivaz/life/commit/f8759698397af084863088c7ed43d8440514db44))
* apply formatting ([afe41ca](https://github.com/fivaz/life/commit/afe41ca49623e1e04c9671ccb37a913153058894))
* apply formatting ([76fc70f](https://github.com/fivaz/life/commit/76fc70ff5629817019dda5826f7e41dd3e0d64a8))
* apply formatting ([aa7a032](https://github.com/fivaz/life/commit/aa7a0326e0941c17b243088b6c0ff355f7fe2085))
* apply formatting ([f55a7b8](https://github.com/fivaz/life/commit/f55a7b8f3a792a92e2953b6afa47e27883679fee))
* apply formatting ([7a7837e](https://github.com/fivaz/life/commit/7a7837ea664dfddeb3ebf78cff63d5c66a518e75))
* **release:** 1.0.0 [skip ci] ([783c5b3](https://github.com/fivaz/life/commit/783c5b321c8b391c57107f74c531ba36c40cc1f2))
* **release:** 1.1.0 [skip ci] ([7e61934](https://github.com/fivaz/life/commit/7e61934e1e1847b9a50f53565880d65ff6cb7aa6))
* **release:** 1.2.0 [skip ci] ([54a5fec](https://github.com/fivaz/life/commit/54a5fecc27d5dc3dd4412e88cfb07b395f80f034))
* **release:** 1.2.1 [skip ci] ([eab71ab](https://github.com/fivaz/life/commit/eab71ab08cc1463a6217a181014093e30dc4c669))
* **svelendar:** add a tab to DayTasksList ([986774c](https://github.com/fivaz/life/commit/986774cab298ac349e1f9b757ea064475138cd25))
* **svelendar:** release 1.0.0 [skip ci] ([0ee064c](https://github.com/fivaz/life/commit/0ee064ccf44f781519eba17bf78420d7634b3740))
* **svelendar:** release 1.1.0 [skip ci] ([02c60bb](https://github.com/fivaz/life/commit/02c60bb32386c00708a021e850ec6a299057d08e))
* **svelendar:** release 1.2.0 [skip ci] ([6d1b115](https://github.com/fivaz/life/commit/6d1b115f1b93c73603126f3b87acc3b907dade3c))

### 💄 Styles

* **life:** move Category type from life to shared ([848f0e3](https://github.com/fivaz/life/commit/848f0e3c1ccd6a367e73d6392181f98ff16e6a20))
* **svelendar:** move components to lib/components ([d193c0a](https://github.com/fivaz/life/commit/d193c0a89c85d729db3672748127f09700c00610))
* **svelendar:** rename components DaySummary ([f15cc52](https://github.com/fivaz/life/commit/f15cc5281922265935e890c66fe1d21a6079d519))

### 🔨 Code Refactoring

* **life:** remove unused functions, and rework round date functions ([fc0f54c](https://github.com/fivaz/life/commit/fc0f54c59988711760efc17ade31cac178af1ec2))
* **svelendar:** simplify and comment function getProcessedChartData ([5c2ff0f](https://github.com/fivaz/life/commit/5c2ff0fb2fcae44a0cbd1dbb815f21e9c9df2ade))

### 👷 Build System

* **life:** automatically run release in dry mode locally ([d17a383](https://github.com/fivaz/life/commit/d17a3834e4904758418ec688a5fb4d63a9faed13))
* **life:** change pre-push commit msg type ([aecdd14](https://github.com/fivaz/life/commit/aecdd14f330ff03d6b14f27241638ed007a9d297))
* **life:** force act to simulate branch main ([efb44c3](https://github.com/fivaz/life/commit/efb44c3dd45910aef5e4d8998a0bd69eb6835478))
* **life:** ignore .md files when running prettier ([a900b15](https://github.com/fivaz/life/commit/a900b1585568a1ebfd70415885ea987ec3db0b87))
* **life:** move .actrc cache folder to inside the directory ([6398c62](https://github.com/fivaz/life/commit/6398c627e472de9456b05e46608c1ca78470b38f))
* **life:** move act config from cli to .actrc ([932f624](https://github.com/fivaz/life/commit/932f624c50027f49f244e12ac7809781a4bbb6a7))
* **life:** separate act node_modules folder from dev node_modules folder ([f039d0a](https://github.com/fivaz/life/commit/f039d0ac689e9546129bc6369c7db7558e8e34a5))
* **svelendar:** make act skip npm publishing ([50c9b6e](https://github.com/fivaz/life/commit/50c9b6eef8f3960c4b2b1d3f988720cde89b3352))

### 🔧 Continuous Integration

* **life:** add cache to git actions ([9dbc95a](https://github.com/fivaz/life/commit/9dbc95ae88b42c8262421b914062aef1ca83fb85))
* **life:** add changelog file and update package.json versions on releases ([b441b79](https://github.com/fivaz/life/commit/b441b79791cab060f3f5e00767b1a31bfbeb2a31))
* **life:** add emojis to release ([98f1f30](https://github.com/fivaz/life/commit/98f1f3096168157d5b209071288d4af4dda45455))
* **life:** add semantic release ([1186e52](https://github.com/fivaz/life/commit/1186e527f4f66d0b38780eaf16b2bfd519e23799))
* **life:** declare necessary envs in github actions from github secrets ([4b065f3](https://github.com/fivaz/life/commit/4b065f3a6aeb626460fece99b7b3603d7bb06782))
* **life:** disable husky in github actions ([927079c](https://github.com/fivaz/life/commit/927079c6c91704d73042e9228fd0aeee686b4e09))
* **life:** fix bug keeping husky in git actions ([54e4a0f](https://github.com/fivaz/life/commit/54e4a0f8983fe8201ed21be5c8219bb629bd60b2))
* **svelendar:** remove NPM_TOKEN, use OIDC instead ([2a412d3](https://github.com/fivaz/life/commit/2a412d3b3038b3e9f5a6fa7c47ac4de8b887a81e))
* **svelendar:** update config for OIDC ([a9c5b6b](https://github.com/fivaz/life/commit/a9c5b6bef96a4ac4f3bce687fa7e0a7477c87432))
* **web:** add PUBLIC_COMMIT_HASH to .env to build in git actions ([1af0649](https://github.com/fivaz/life/commit/1af06495a3382afb36acf076b4be2f1a8c572701))
* **web:** fix bug with HUSKY as first env ([e004e80](https://github.com/fivaz/life/commit/e004e80bfe1b8b98f7bc2781b62a03f626782106))
* **web:** make release update web/package.json version instead of the root one ([01f388a](https://github.com/fivaz/life/commit/01f388a47cd32659efd9c9131a735fe853a9db61))
* **web:** move release from root to web ([02d4f5f](https://github.com/fivaz/life/commit/02d4f5f5708c1d8476b0a3d80eacb69ed76c0291))
