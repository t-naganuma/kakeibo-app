# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

家計簿アプリ「kakeibo-app」のNext.js 15アプリケーション。React 19、TypeScript、TailwindCSS v4を使用。

## 開発コマンド

- `npm run dev` - 開発サーバー起動 (http://localhost:3000)
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバー起動
- `npm run lint` - Biomeによるlint + 自動修正
- `npm run format` - Biomeによるフォーマット
- `npm run check` - Biome check（lint + format）+ 自動修正

## 開発環境とツール

- **Linting & Formatting**: Biome（ESLint/Prettierの代替）
- **コードスタイル**: タブインデント、シングルクォート
- **Git Hooks**: Lefthookがpre-commitでBiome checkを実行
- **エラーハンドリング**: neverthrowライブラリ（Result型）

## アーキテクチャ

- **Next.js App Router**: src/appディレクトリ構造
- **フォント**: Geist Sans/Monoをnext/font/googleで使用
- **スタイリング**: TailwindCSS v4 + PostCSS
- **TypeScript**: 厳密な型設定

## 重要

ユーザーはclaudeよりプログラミングが得意ですが、時短のためにコーディングを依頼しています。

2回以上連続でテストを失敗した時は、現在の状況を整理して、一緒に解決方法を考えます。

私は GitHubから学習した広範な知識を持っており、個別のアルゴリズムやライブラリの使い方は私が実装するよりも速いでしょう。テストコードを書いて動作確認しながら、ユーザーに説明しながらコードを書きます。

反面、現在のコンテキストに応じた処理は苦手です。コンテキストが不明瞭な時は、ユーザーに確認します。

## 作業開始準備

`git status` で現在の git のコンテキストを確認します。
もし指示された内容と無関係な変更が多い場合、現在の変更からユーザーに別のタスクとして開始するように提案してください。

無視するように言われた場合は、そのまま続行します。


# コーディングプラクティス

## 原則

### 関数型アプローチ (FP)

- 純粋関数を優先
- 不変データ構造を使用
- 副作用を分離
- 型安全性を確保

### ドメイン駆動設計 (DDD)

- 値オブジェクトとエンティティを区別
- 集約で整合性を保証
- リポジトリでデータアクセスを抽象化
- 境界付けられたコンテキストを意識

### テスト駆動開発 (TDD)

- Red-Green-Refactorサイクル
- テストを仕様として扱う
- 小さな単位で反復
- 継続的なリファクタリング

## 実装パターン

### 型定義

```typescript
// ブランデッド型で型安全性を確保
type Branded<T, B> = T & { _brand: B };
type Money = Branded<number, "Money">;
type Email = Branded<string, "Email">;
```

### 値オブジェクト

- 不変
- 値に基づく同一性
- 自己検証
- ドメイン操作を持つ

```typescript
// 作成関数はバリデーション付き
function createMoney(amount: number): Result<Money, Error> {
  if (amount < 0) return err(new Error("負の金額不可"));
  return ok(amount as Money);
}
```

### エンティティ

- IDに基づく同一性
- 制御された更新
- 整合性ルールを持つ

### Result型

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```

- 成功/失敗を明示
- 早期リターンパターンを使用
- エラー型を定義

### リポジトリ

- ドメインモデルのみを扱う
- 永続化の詳細を隠蔽
- テスト用のインメモリ実装を提供

### アダプターパターン

- 外部依存を抽象化
- インターフェースは呼び出し側で定義
- テスト時は容易に差し替え可能

## 実装手順

1. **型設計**
   - まず型を定義
   - ドメインの言語を型で表現

2. **純粋関数から実装**
   - 外部依存のない関数を先に
   - テストを先に書く

3. **副作用を分離**
   - IO操作は関数の境界に押し出す
   - 副作用を持つ処理をPromiseでラップ

4. **アダプター実装**
   - 外部サービスやDBへのアクセスを抽象化
   - テスト用モックを用意

## プラクティス

- 小さく始めて段階的に拡張
- 過度な抽象化を避ける
- コードよりも型を重視
- 複雑さに応じてアプローチを調整
- 1ファイルは500行程度

## コードスタイル

- 関数優先（クラスは必要な場合のみ）
- 不変更新パターンの活用
- 早期リターンで条件分岐をフラット化
- エラーとユースケースの列挙型定義

## テスト戦略

- 純粋関数の単体テストを優先
- インメモリ実装によるリポジトリテスト
- テスト可能性を設計に組み込む
- アサートファースト：期待結果から逆算

## TypeScript

TypeScriptでのコーディングにおける一般的なベストプラクティスをまとめます。

### 方針

- 最初に型と、それを処理する関数のインターフェースを考える
- コードのコメントとして、そのファイルがどういう仕様かを可能な限り明記する
- 実装が内部状態を持たないとき、 class による実装を避けて関数を優先する
- 副作用を抽象するために、アダプタパターンで外部依存を抽象し、テストではインメモリなアダプタで処理する

### 型の使用方針

1. 具体的な型を使用
   - any の使用を避ける
   - unknown を使用してから型を絞り込む
   - Utility Types を活用する

2. 型エイリアスの命名
   - 意味のある名前をつける
   - 型の意図を明確にする
   ```ts
   // Good
   type UserId = string;
   type UserData = {
     id: UserId;
     createdAt: Date;
   };

   // Bad
   type Data = any;
   ```

### エラー処理

1. Result型の使用
   ```ts
   import { err, ok, Result } from "npm:neverthrow";

   type ApiError =
     | { type: "network"; message: string }
     | { type: "notFound"; message: string }
     | { type: "unauthorized"; message: string };

   async function fetchUser(id: string): Promise<Result<User, ApiError>> {
     try {
       const response = await fetch(`/api/users/${id}`);
       if (!response.ok) {
         switch (response.status) {
           case 404:
             return err({ type: "notFound", message: "User not found" });
           case 401:
             return err({ type: "unauthorized", message: "Unauthorized" });
           default:
             return err({
               type: "network",
               message: `HTTP error: ${response.status}`,
             });
         }
       }
       return ok(await response.json());
     } catch (error) {
       return err({
         type: "network",
         message: error instanceof Error ? error.message : "Unknown error",
       });
     }
   }
   ```

2. エラー型の定義
   - 具体的なケースを列挙
   - エラーメッセージを含める
   - 型の網羅性チェックを活用

### 実装パターン

1. 関数ベース（状態を持たない場合）
   ```ts
   // インターフェース
   interface Logger {
     log(message: string): void;
   }

   // 実装
   function createLogger(): Logger {
     return {
       log(message: string): void {
         console.log(`[${new Date().toISOString()}] ${message}`);
       },
     };
   }
   ```

2. classベース（状態を持つ場合）
   ```ts
   interface Cache<T> {
     get(key: string): T | undefined;
     set(key: string, value: T): void;
   }

   class TimeBasedCache<T> implements Cache<T> {
     private items = new Map<string, { value: T; expireAt: number }>();

     constructor(private ttlMs: number) {}

     get(key: string): T | undefined {
       const item = this.items.get(key);
       if (!item || Date.now() > item.expireAt) {
         return undefined;
       }
       return item.value;
     }

     set(key: string, value: T): void {
       this.items.set(key, {
         value,
         expireAt: Date.now() + this.ttlMs,
       });
     }
   }
   ```

3. Adapterパターン（外部依存の抽象化）
   ```ts
   // 抽象化
   type Fetcher = <T>(path: string) => Promise<Result<T, ApiError>>;

   // 実装
   function createFetcher(headers: Record<string, string>): Fetcher {
     return async <T>(path: string) => {
       try {
         const response = await fetch(path, { headers });
         if (!response.ok) {
           return err({
             type: "network",
             message: `HTTP error: ${response.status}`,
           });
         }
         return ok(await response.json());
       } catch (error) {
         return err({
           type: "network",
           message: error instanceof Error ? error.message : "Unknown error",
         });
       }
     };
   }

   // 利用
   class ApiClient {
     constructor(
       private readonly getData: Fetcher,
       private readonly baseUrl: string,
     ) {}

     async getUser(id: string): Promise<Result<User, ApiError>> {
       return await this.getData(`${this.baseUrl}/users/${id}`);
     }
   }
   ```

### 実装の選択基準

1. 関数を選ぶ場合
   - 単純な操作のみ
   - 内部状態が不要
   - 依存が少ない
   - テストが容易

2. classを選ぶ場合
   - 内部状態の管理が必要
   - 設定やリソースの保持が必要
   - メソッド間で状態を共有
   - ライフサイクル管理が必要

3. Adapterを選ぶ場合
   - 外部依存の抽象化
   - テスト時のモック化が必要
   - 実装の詳細を隠蔽したい
   - 差し替え可能性を確保したい

### 一般的なルール

1. 依存性の注入
   - 外部依存はコンストラクタで注入
   - テスト時にモックに置き換え可能に
   - グローバルな状態を避ける

2. インターフェースの設計
   - 必要最小限のメソッドを定義
   - 実装の詳細を含めない
   - プラットフォーム固有の型を避ける

3. テスト容易性
   - モックの実装を簡潔に
   - エッジケースのテストを含める
   - テストヘルパーを適切に分離

4. コードの分割
   - 単一責任の原則に従う
   - 適切な粒度でモジュール化
   - 循環参照を避ける

