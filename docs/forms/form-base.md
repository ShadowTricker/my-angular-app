# Form Base  

## 1. 简介  
Angular 中提供了两种不同表单的构建方式：  
- 响应式表单  
  提供对底层表单对象直接、显式的访问。可扩展性，可复用性，可测试性都比模板驱动表单更高。  
- 模板驱动表单  
  依赖模板中的指令来创建和操作底层的对象模型。创建简单表单是模板驱动表单的优势，但是在扩展性，复用和测试性上比较差。
- 关键差异  
  ||响应式|模板驱动
  |--|--|--|
  |建立表单模型|显式，在组件类中创建|隐式，由指令创建|
  |数据模型|结构化和不可变的|非结构化和可变的|
  |可预测性|同步|异步|
  |表单验证|函数|指令|  

---

## 2. 常用表单基础类  
响应式表单和模板驱动表单都建立在下列基础类之上：  
- FormControl：用于追踪单个表单控件的值和验证状态。
- FormGroup：用于追踪一个表单组的值和状态。
- FormArray：用于追踪表单数组控件的值和状态。
- ControlValueAccessor： 用于在 FormControl 和 原生 DOM 元素之间创建一个桥梁，也是自定义表单控件的基础。  

---

## 3. 表单的模型与数据流  
1\. 响应式表单  
```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-favorite-color',
  template: `
    Favorite Color: <input type="text" [formControl]="favoriteColorControl">
  `
})
export class FavoriteColorComponent {
  favoriteColorControl = new FormControl('');
}
```
- 模型
  此例中，表单实例通过 [formControl] 指令绑定到元素上。响应式表单中可以直接在组件类中对实例进行操作。
- 数据流
  在响应式表单中，从视图到模型的修改以及模型到视图的修改都是同步的，而且不依赖 UI 的渲染方式。  
    - 视图 => 模型  
      1. 用户在输入框输入一个值。
      2. 输入框用最新值发出一个 input 事件。
      3. 此 FormControl 实例上的值访问器（ControlValueAccessor）会监听表单元素的事件（在此为 input 事件），并把新值传递给 FormControl 实例。
      4. 该实例的 valueChanges 属性会发出新值。
      5. 监听 valueChanges 的方法接收到这个新值。
      6. 总结来说就是：Input（View）=> FormDirective(Accessor) => FormControl => FormControl.valueChanges => listeners
    - 模型 => 视图  
      1. 通过 FormControl 提供的 setValue 修改该实例的值。
      2. 该实例的 valueChanges 发出新值。
      3. 监听 valueChanges 的方法接收到这个新值。
      4. 值访问器（ControlValueAccessor）修改元素的值。
      5. 总结来说：setValue => (valueChanges && Accessor change) valueChanges 和 值访问器修改元素值是同时进行的。

2\. 模板驱动表单
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-template-favorite-color',
  template: `
    Favorite Color: <input type="text" [(ngModel)]="favoriteColor">
  `
})
export class FavoriteColorComponent {
  favoriteColor = '';
}
```
- 模型
  此例中，表单模型是建立的。通过 [ngModel] 指令为表单元素创建并且管理一个 FormControl 实例。不通过 ngModel 是没有办法获取 FormControl 实例的。
- 数据流
  在模板驱动表单中，每一个表单元素都是和一个负责管理内部表单模型的指令关联起来的。  
    - 视图 => 模型  
      1. 用户在输入框输入一个值。
      2. 输入框用最新值发出一个 input 事件。
      3. 值访问器（Accessor）触发 FormControl 的 setValue() 方法。
      4. 该实例的 valueChanges 属性会发出新值。
      5. 监听 valueChanges 的方法接收到这个新值。
      6. 触发 setValue 的同时，值访问器调用 viewToModelUpdate() 方法，发出 ngModelChange 事件。
      7. 组件类中的对应属性会通过 ngModelChange 事件更新值。
      8. 总结：input(View) => (setValue() && ngModelChange())
    - 模型 => 视图  
      1. 修改组件类中的值。
      2. 变更检测开始。
      3. Angular 调用 ngModel 指令上的 ngOnChanges 钩子函数。
      4. ngOnChanges() 方法将设置 FormControl 的值得方法放入异步队列。
      5. 变更监测完成。
      6. 下一次监测周期，异步队列中的更新方法执行，更新 FormCotrol 的值。
      7. FormControl 的 valueChanges 发出新的值。
      8. valueChanges 的所有监听者都会接受到新的值。
      9. 更新 FormControl 的值的同时，值访问器更新视图中元素的值。

## 4. 数据模型的可变性
1\. 响应式表单以不可变的数据结构来提供数据模型。当数据模型发生修改时，FormControl 都会返回一个新的数据模型，而不会修改现有的数据模型。所以这会让变更监测更有效率。由于遵从响应式模式，因此可以使用各种操作符以转换数据。
2\. 模板驱动表单依赖于可变性和双向绑定，可以在模板作出更改时更新组件中的数据模型（是更新，不是返回新的）。



