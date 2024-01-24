# Jubo 小專案

## 前端項目內容：

請做一個簡單的 List 呈現 Patients，並於點擊後跳出 Dialog 呈現該 Patient 的 Order(醫囑)，於 Dialog 右上增加可新增 Order 按鈕，並提供編輯回存功能。

- 採用 Vite + React + MUI +
- lodash-es
- react-hook-form (表單處理套件) + yup (表單驗證)
- SWR http 請求工具
- zustand 狀態管理
- 撰寫測試來不及完成

### 前端項目 app/frontend/src 下架構

```
├── 📁 src
│   ├── App*.tsx
│   ├── 📁 api
│   │   ├── 📁 class （ 放置 api class ）
│   │   │   ├── baseApi.ts
│   │   │   ├── ordersApi.ts
│   │   │   ├── patientsApi.ts
│   │   │   └── relevancesApi.ts
│   │   ├── 📁 interface
│   │   │   ├── base.interface.ts
│   │   │   ├── order.interface.ts
│   │   │   ├── patient.interface.ts
│   │   │   └── relevance.interface.ts
│   │   └── 📁 swr （ 放置查詢 api hook ）
│   │       └── usePatientWithOrders.ts
│   ├── 📁 components
│   │   ├── 📁 alerts
│   │   │   └── SnackbarAlert.tsx
│   │   ├── 📁 dialogs
│   │   │   └── Dialog.tsx
│   │   ├── 📁 list
│   │   │   └── OrderList.tsx
│   │   ├── 📁 providers
│   │   │   └── 📁 MuiThemeProvider
│   │   │       └── MuiThemeProvider.tsx
│   │   └── 📁 reactHookForm
│   │       ├── 📁 fields
│   │       │   └── 📁 TextField
│   │       │       └── TextField.tsx
│   │       └── 📁 forms
│   │           └── 📁 OrderForm
│   │               ├── OrderForm.tsx
│   │               └── 📁 validationSchemas
│   │                   └── validationSchema.ts
│   ├── hooks
│   │   ├── alerts
│   │   │   └── useSnackbarAlert.ts
│   │   ├── browserCache
│   │   │   └── useLocalStorageState.ts
│   │   ├── components
│   │   │   └── dialogs
│   │   │       └── useIsOpenDialog.ts
│   │   ├── lifecycle
│   │   │   ├── useDidMount.ts
│   │   │   ├── useDidUpdate.ts
│   │   │   └── useWillUnmount.ts
│   │   ├── theme
│   │   │   ├── breakpoint
│   │   │   │   └── useMatchBreakpointLg.ts
│   │   │   ├── useSx.ts
│   │   │   └── useTheme.ts
│   │   └── zustand
│   │       └── useCmdInputHistoryStore.ts
│   ├── index.css
│   ├── main.tsx
│   ├── themes
│   │   ├── defaultTheme.ts
│   │   ├── themes.ts
│   │   └── types.ts
│   ├── vite-env.d.ts
│   └── zustand
│       └── store.ts
```

## 後端項目內容：

開設相應 RESTful API

- 採用 Nodejs + Express + Prisma (ORM)
- compression 壓縮response內文
- cors + cookie +
- dotenv + envalid 讀取與與驗證環境變數
- morgan + winston 配置logger
- reflect + typedi 依賴注入工具，用來注入service至controller
- swagger 產生API文件
- zod 處理DTO驗證，處理傳入body物件屬性驗證
- helmet + hpp 協助保護 Express 應用程式的安全性、排除參數污染
- 資料庫採用 PostgreSQL
- 撰寫測試來不及完成

### 後端項目 app/backend/src 下架構

```
├── 📁 src
│   ├── app.ts
│   ├── 📁 config
│   │   └── index.ts
│   ├── 📁 controllers
│   │   ├── order.controller.ts
│   │   ├── patient.controller.ts
│   │   └── relevance.controller.ts
│   ├── 📁 dtos
│   │   ├── order.dto.ts
│   │   ├── patient.dto.ts
│   │   └── relevance.dto.ts
│   ├── 📁 exceptions
│   │   └── httpException.ts
│   ├── 📁 interfaces
│   │   ├── order.interface.ts
│   │   ├── patient.interface.ts
│   │   ├── relevance.interface.ts
│   │   └── routes.interface.ts
│   ├── 📁 logs
│   │   ├── debug
│   │   │   └── 2024-01-24.log
│   │   └── error
│   │       └── 2024-01-24.log
│   ├── 📁 middlewares
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── 📁 prisma
│   │   ├── client.ts
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── 📁 routes
│   │   ├── order.route.ts
│   │   ├── patient.route.ts
│   │   └── relevance.route.ts
│   ├── server.ts
│   ├── 📁 services
│   │   ├── order.service.ts
│   │   ├── patient.service.ts
│   │   └── relevance.service.ts
│   ├── 📁 test (測試未完成)
│   │   ├── index.test.ts
│   │   └── users.test.ts
│   └── 📁 utils
│       ├── asyncWrapper.ts
│       ├── debug
│       ├── error
│       ├── fillEmptyArray.ts
│       ├── logger.ts
│       └── validateEnv.ts
```

# How to start

請先確定node版本 > 18 以上
請先建立空資料庫 jubo , schema=public

## 安裝套件

在專案根目錄中，開啟終端機輸入:

```
npm install
```

## backend server

至 app/backend/中 .example.env.development.local 檔案複製貼上後
產生 .env.development copy.local 檔案，
重新命名為 .env.development.local 並修改 DATABASE_URL 為正確的資料庫連線參數

接著在專案根目錄中，開啟另一個終端機輸入：

```
cd app/backend/
npm run prisma:push
npm run prisma:generate
npm run prisma:seed
npm run dev
```

這樣本地後端開發Server就起起來了
可以至 ： http://localhost:3000/api-docs/
檢視api文件

## frontend server

至 app/frontend/中 .example.env 檔案複製貼上後
產生 .example copy.env 檔案，
重新命名為 .env 並修改 VITE_API_URL 為正確的後端URL

接著在專案根目錄中，開啟另一個終端機輸入：

```
cd app/frontend/
npm run dev
```

這樣本地前端開發Server就起起來了

感謝您的閱讀～
