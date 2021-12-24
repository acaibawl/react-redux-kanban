import baretest from 'baretest'
import assert from 'assert'
import produce from 'immer'
import { reducer, State } from '../src/reducer'
import { ColumnID, CardID } from '../src/api'

const test = baretest('reducer')
// テスト開始の関数をファイル内の行が最後まで実行された後に実行されるように登録
setImmediate(() => test.run())

const initialState: State = {
  filterValue: '',
  cardsOrder: {},
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

test('App.SetCards', async () => {
  const prev = produce(initialState, draft => {
    draft.columns = [
      {
        id: 'A' as ColumnID,
      },
      {
        id: 'B' as ColumnID,
      },
    ]
  })

  const next = reducer(prev, {
    type: 'App.SetCards',
    payload: {
      cards: [
        {
          id: '3' as CardID,
        },
        {
          id: '2' as CardID,
        },
        {
          id: '1' as CardID,
        },
      ],
      cardsOrder: {
        A: '1' as CardID,
        '1': '2' as CardID,
        '2': 'A' as CardID,
        B: '3' as CardID,
        '3': 'B' as CardID,
      },
    },
  })

  const expected = produce(prev, draft => {
    draft.cardsOrder = {
      A: '1' as CardID,
      '1': '2' as CardID,
      '2': 'A' as CardID,
      B: '3' as CardID,
      '3': 'B' as CardID,
    }
    draft.columns = [
      {
        id: 'A' as ColumnID,
        cards: [
          {
            id: '1' as CardID,
          },
          {
            id: '2' as CardID,
          },
        ],
      },
      {
        id: 'B' as ColumnID,
        cards: [
          {
            id: '3' as CardID,
          },
        ],
      },
    ]
  })

  assert.deepStrictEqual(next, expected)
})
