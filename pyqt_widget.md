## Qt Widget

Table of Contents
=================

  * [单一控件](#单一控件)
    * [下拉框](#下拉框)
      * [初始化下拉框](#初始化下拉框)
      * [添加下拉项](#添加下拉项)
    * [列表](#列表)
      * [初始化列表](#初始化列表)
      * [添加列表项](#添加列表项)
      * [删除列表项](#删除列表项)
    * [表格](#表格)
      * [初始化表格](#初始化表格)
      * [添加表项](#添加表项)
    * [消息弹窗](#消息弹窗)
    * [快捷键](#快捷键)
    * [工具栏](#工具栏)
      * [初始化工具栏](#初始化工具栏)
      * [添加单项](#添加单项)
      * [添加多项](#添加多项)
  * [编辑器](#编辑器)
    * [控件类型](#控件类型)
      * [字体下拉框](#字体下拉框)
      * [字号下拉框](#字号下拉框)
      * [颜色对话框](#颜色对话框)
    * [文本处理](#文本处理)
      * [对齐](#对齐)
      * [字符格式](#字符格式)
  * [布局](#布局)
    * [尺寸](#尺寸)
    * [占比](#占比)
    * [对齐](#对齐-1)
    * [间距](#间距)
  * [图像](#图像)
    * [初始化图像对象](#初始化图像对象)
      * [QImage](#qimage)
      * [QPixmap](#qpixmap)
    * [原图转灰度图](#原图转灰度图)
      * [convertToFormat](#converttoformat)
      * [through ndarray(OpenCV)](#through-ndarrayopencv)
    * [原图转黑白二值图](#原图转黑白二值图)
      * [through ndarray(OpenCV)](#through-ndarrayopencv-1)
  * [绘制](#绘制)
    * [绘制路径](#绘制路径)
  * [获取路径](#获取路径)
  * [复制与粘贴](#复制与粘贴)

### 单一控件

#### 下拉框

##### 初始化下拉框

```python
cb = QComboBox(parent)
cb.setMaximumWidth(w)
cb.setEditable(False)
```

##### 添加下拉项

```python
cb.addItem("item1")
```

#### 列表

##### 初始化列表

```python
list = QListWidget()
```

##### 添加列表项

```python
item = QListWidgetItem()
widget = QWidget()
list.addItem(item)
list.setItemWidget(item, widget)
```

##### 删除列表项

```python
list.takeItem(list.row(item))
del item
```

#### 表格

##### 初始化表格

```python
table = QTableWidget()
table.setRowCount(r)
table.setColumnCount(c)
table.setRowHeight(r_idx, h)
table.setColumnWidth(c_idx, w)
table.setShowGrid(True)
table.setFrameShape(QFrame.NoFrame)
table.horizontalHeader().setVisible(False)
table.verticalHeader().setVisible(False)
table.horizontalHeader().setStretchLastSection(True)
table.setSelectionBehavior(QAbstractItemView.SelectRows)
table.setEditTriggers(QAstractItemView.DoubleClicked)
```

##### 添加表项

```python
table.setCellWidget(r_idx, c_idx, widget)
```

#### 消息弹窗

```python
QMessageBox.information(parent, "Info", "")                                         # optional: question, warning, critical
```

#### 快捷键

```python
QShortcut(QKeySequence.Delete, parent, activated=do_delete)                         # optional: StandardKey
```

#### 工具栏

##### 初始化工具栏

```python
tb = QToolBar("Tool bar")
```

##### 添加单项

```python
action = QAction(icon, "", parent)
tb.addAction(action)
```

##### 添加多项

```python
group = QActionGroup(parent)
group.addAction(action1)
group.addAction(action2)
group.addAction(action3)
tb.addActions(group.actions())
```

### 编辑器

#### 控件类型

##### 字体下拉框

```python
cb = QFontComboBox(parent)
cb.setMaximumWidth(w)
cb.setEditable(False)
cb.textActivated.connect(change_family)
```

##### 字号下拉框

```python
cb = QComboBox(parent)
cb.addItems([size for size in QFontDatabase.standardSizes()])
cb.setCurrentIndex(QFontDatabase.standardSizes().index(QApplication.font().pointSize()))
cb.setMaximumWidth(w)
cb.setEditable(False)
cb.textActivated.connect(change_size)
```

##### 颜色对话框

```python
color = QColorDialog.getColor(init_color, parent)
```
#### 文本处理

##### 对齐

```python
text_edit.setAlignment(Qt.AlignLeft | Qt.AlignAbsolute)                             # optional: AlignRight, AlignHCenter, AlignJustify
```

##### 字符格式

```python
fmt = QTextCharFormat()
fmt.setFontFamily(f)                                                                # optional: setFontPointSize, setForeground, setFontWeight, setFontItalic, setFontUnderline
cursor = text_edit.textCursor()
if not cursor.hasSelection():
    cursor.select(QTextCursor.WordUnderCursor)
cursor.mergeCharFormat(fmt)
text_edit.mergeCurrentCharFormat(fmt)
```

### 布局

#### 尺寸

```text
                   widget
                      |
                      v
                 有无layout
                      |
        +--有---------+---------无--+
        |                           |
        v                           v
    最终尺寸参考                 最终尺寸参考
layout的sizePolicy         widget默认的sizePolicy

+------------------------------+-----------------------------------------------------------------------------+
|       QSizePolicy.Fixed      |                       只使用sizeHint提供的值，无伸缩                         |
+------------------------------+-----------------------------------------------------------------------------+
|      QSizePolicy.Minimum     |                     将sizeHint提供的值视为最小值，可拉伸                     |
+------------------------------+-----------------------------------------------------------------------------+
|      QSizePolicy.Maximum     |                     将sizeHint提供的值视为最大值，可压缩                     |
+------------------------------+-----------------------------------------------------------------------------+
|     QSizePolicy.Preferred    |                     将sizeHint提供的值视为最佳值，可伸缩                     |
+------------------------------+-----------------------------------------------------------------------------+
|     QSizePolicy.Expanding    |  将sizeHint提供的值视为合适值，可被压缩，更倾向于拉伸（与Preferred同时存在时）|
+------------------------------+-----------------------------------------------------------------------------+
| QSizePolicy.MinimumExpanding |                   将sizeHint提供的值视为最小值，倾向于拉伸                   |
+------------------------------+-----------------------------------------------------------------------------+
|       QSizePolicy.Ignored    |                       忽略sizeHint提供的值，倾向于拉伸                       |
+------------------------------+-----------------------------------------------------------------------------+
```

#### 占比

以sizePolicy是Preferred的QTextEdit作为widget为例：

```python
'''
                            Expanded
                               |
        parent layout          |
        +----------------------|-----------+ +---------------+ 
-       |+---------------------|----------+| |+-------------+|
^       ||+--------------------|---------+|| ||+-----------+||
|       |||                    |         ||| |||           |||
|       |||                    |         ||| |||     3     ||| 
3       |||              1     v         ||| |||           ||| 
|       |||                              ||| ||+-----------+||
|       |||                              ||| |+-------------+| 
v       ||+------------------------------+|| |+-------------+| 
-       |+--------------------------------+| ||+-----------+||
-       |+--------------------------------+| |||           |||
^       ||+------------------------------+|| |||     4     |||
1       |||              2               ||| |||           |||
v       ||+------------------------------+|| ||+-----------+|| 
-       |+--------------------------------+| |+-------------+| 
        +----------------------------------+ +---------------+ 

        |<---------------2---------------->| |<------1------>|
'''

child_layout1 = QVBoxLayout()
child_layout1.addWidget(widget1)
child_layout1.addWidget(widget2)
child_layout1.setStretchFactor(widget1, 3)
child_layout1.setStretchFactor(widget2, 1)

child_layout2 = QVBoxLayout()
child_layout2.addWidget(widget3)
child_layout2.addWidget(widget4)

parent_layout = QHBoxLayout()
parent_layout.addLayout(child_layout1)
parent_layout.addLayout(child_layout2)
parent_layout.setStretchFactor(child_layout1, 2)
parent_layout.setStretchFactor(child_layout2, 1)
parent_widget.setLayout(parent_layout)
```

#### 对齐

```python
'''
            Align center, noexpand
                       |
parent layout          |
+----------------------|-----------+ +---------------+ 
|child layout          |           | |+-------------+|
|+---------------------|----------+| ||+-----------+||
||   child widget      |          || |||           |||
||      +--------------|---+      || |||     3     ||| 
||      |              v   |      || |||           ||| 
||      |        1         |      || ||+-----------+||
||      |                  |      || |+-------------+| 
||      +------------------+      || |+-------------+| 
|+--------------------------------+| ||+-----------+||
|+--------------------------------+| |||           |||
||+------------------------------+|| |||     4     |||
|||              2               ||| |||           |||
||+------------------------------+|| ||+-----------+|| 
|+--------------------------------+| |+-------------+| 
+----------------------------------+ +---------------+ 
'''

child_layout1.addWidget(child_widget1, alignment=Qt.AlignCenter)
```


#### 间距

```python
'''
parent layout          
+----------------------------------+ +---------------+
|child layout                      | |+-------------+|
|+--------------------------------+| ||+-----------+||
||   child widget                 || |||     3     |||
||      +------------------+      || ||+-----------+||
||      |                  |      || |+-------------+|
||      |        1         |      || |               |
||      |                  |      || |    spacing    |
||      +------------------+      || |     added     |
|+--------------------------------+| |               |
|+--------------------------------+| |+-------------+|
||+------------------------------+|| ||+-----------+||
|||              2               ||| |||     4     |||
||+------------------------------+|| ||+-----------+||
|+--------------------------------+| |+-------------+|
+----------------------------------+ +---------------+
'''

child_layout2.addWidget(child_widget3)
child_layout2.addSpacing(40)
child_layout2.addWidget(child_widget4)
```

```python
'''        
+---------------+
|+-------------+|
||+-----------+||
|||     3     |||
||+-----------+||
|+-------------+|
|    spacing    |
|+-------------+|
||+-----------+||
|||     4     |||
||+-----------+||
|+-------------+|
|    spacing    |
|+-------------+|
||+-----------+||
|||     5     |||
||+-----------+||
|+-------------+|
+---------------+
'''

child_layout2.addWidget(child_widget3)
child_layout2.addWidget(child_widget4)
child_layout2.addWidget(child_widget5)
child_layout2.setSpacing(10)
```

### 图像

#### 初始化图像对象

##### QImage

```python
image1 = QImage(path)                                                               # optional: QImage(w, h, format)
```

##### QPixmap

```python
image2 = QPixmap()                                                                  # optional: QPixmap(w, h), QPixmap.fromImage(image1)
```

#### 原图转灰度图

##### convertToFormat

```python
image = QImage(path)
gray_image = image.convertToFormat(QImage.Format_Grayscale8, Qt.AutoColor)
```

##### through ndarray(OpenCV)

```python
matrix = qimage2ndarray.rgb_view(image)
gray_matrix = cv.cvtColor(matrix, cv.COLOR_RGB2GRAY)
gray_image = QImage(gray_matrix.data, gray_matrix.shape[1], gray_matrix.shape[0], QImage.Format_Grayscale8)
```

#### 原图转黑白二值图

##### through ndarray(OpenCV)

```python
_, binary_matrix = cv.threshold(matrix, threshold_value, 255, cv.THRESH_BINARY)
binary_image = QImage(binary_matrix.data, binary_matrix.shape[1], binary_matrix.shape[0], QImage.Format_Grayscale8)
```

### 绘制

#### 绘制路径

```python
painter = QPainter(device)
path = QPainterPath()
path.moveTo(p0.x, p0.y)
path.lineTo(p1.x, p1.y)                                                             # optional: cubicTo(c1.x, c1.y, c2.x, c2.y, p1.x, p1.y)
path.lineTo(p2.x, p2.y)
path.lineTo(p0.x, p0.y)
painter.drawPath(path)                                                              # optional: fillPath(path, QColor)
```

### 获取路径

```python
path, _ = QFileDialog.getOpenFileName(parent, "load", "", "image (*.jpg *.png)")    # optional: getSaveFileName
```

### 复制与粘贴

```python
datatype = "application/customdata"

def copy():
    mimedata = QMimeData()
    write_target = QByteArray()                                                     # optional: QFile
    datastream = QDataStream(write_target, QIODevice.WriteOnly)
    datastream.writeInt(1)                                                          # optional: writeFloat, writeQString
    image = QPixmap()                                                               # optional: almost all Qt Object
    datastream << image
    mimedata.setData(datatype, write_target)
    clipboard = QGuiApplication.clipboard()
    clipboard.setMimeData(mimedata)

def paste():
    clipboard = QGuiApplication.clipboard()
    mimedata = clipboard.mimeData()
    if mimedata.hasFormat(datatype):
        write_target = mimedata.data(datatype)
        datastream = QDataStream(write_target)
        while not datastream.atEnd():
            data1 = datastream.readInt()                                            # optional: readFloat, readQString
            data2 = QPixmap()
            datastream >> data2
```