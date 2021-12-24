import baretest from 'baretest'
import assert from 'assert'
import produce from 'immer'
import { reducer, State } from '../src/reducer'

const test = baretest('reducer')
// テスト開始の関数をファイル内の行が最後まで実行された後に実行されるように登録
setImmediate(() => test.run())

const initialState: State = {
  filterValue: '',
}

// 引数1=テスト名、引数2=テスト内容
test('Filter.SetFilter', async () => {
  // アクション実行前の状態を作る
  const prev = produce(initialState, draft => {
    draft.filterValue = 'hello'
  })

  // reducerを使ってアクション実行後の状態を作る
  const next = reducer(prev, {
    type: 'Filter.SetFilter',
    payload: {
      value: 'welcome',
    },
  })

  // Immerを使って実行前の状態から期待値を作る
  const expected = produce(prev, draft => {
    draft.filterValue = 'welcome'
  })

  // reducerで実行した後の状態と、Immerで作った期待される状態を比較
  assert.deepStrictEqual(next, expected)
})
