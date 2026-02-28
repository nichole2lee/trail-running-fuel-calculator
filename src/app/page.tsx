'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Trash2, Calculator as CalculatorIcon, Package } from 'lucide-react';

interface Supplement {
  id: number;
  name: string;
  type: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  sodium: number;
  potassium: number;
  calcium: number;
  magnesium: number;
  notes: string | null;
  created_at: string;
}

interface SelectedSupplement extends Supplement {
  quantity: number;
}

const SUPPLEMENT_TYPES = [
  '能量胶',
  '盐丸',
  '能量棒',
  '固体食物',
  '运动饮料',
  '电解质胶囊',
  '能量饼干',
  '其他'
];

export default function CalculatorPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // 新补给品表单
  const [newSupplement, setNewSupplement] = useState({
    name: '',
    type: '能量胶',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    potassium: 0,
    calcium: 0,
    magnesium: 0,
    notes: ''
  });

  useEffect(() => {
    fetchSupplements();
  }, []);

  const fetchSupplements = async () => {
    try {
      const response = await fetch('/api/supplements');
      const result = await response.json();
      if (result.data) {
        setSupplements(result.data);
      }
    } catch (error) {
      console.error('获取补给品失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSupplement = async () => {
    if (!newSupplement.name) {
      alert('请输入补给品名称');
      return;
    }

    try {
      const response = await fetch('/api/supplements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplement),
      });

      const result = await response.json();
      if (result.data) {
        setSupplements([result.data, ...supplements]);
        setShowAddForm(false);
        setNewSupplement({
          name: '',
          type: '能量胶',
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fat: 0,
          sodium: 0,
          potassium: 0,
          calcium: 0,
          magnesium: 0,
          notes: ''
        });
      }
    } catch (error) {
      console.error('添加补给品失败:', error);
    }
  };

  const addToCalculator = (supplement: Supplement) => {
    const existing = selectedSupplements.find(s => s.id === supplement.id);
    if (existing) {
      updateQuantity(supplement.id, existing.quantity + 1);
    } else {
      setSelectedSupplements([...selectedSupplements, { ...supplement, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCalculator(id);
      return;
    }
    setSelectedSupplements(
      selectedSupplements.map(s =>
        s.id === id ? { ...s, quantity } : s
      )
    );
  };

  const removeFromCalculator = (id: number) => {
    setSelectedSupplements(selectedSupplements.filter(s => s.id !== id));
  };

  const calculateTotals = () => {
    return selectedSupplements.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories * item.quantity,
        carbohydrates: acc.carbohydrates + Number(item.carbohydrates) * item.quantity,
        protein: acc.protein + Number(item.protein) * item.quantity,
        fat: acc.fat + Number(item.fat) * item.quantity,
        sodium: acc.sodium + item.sodium * item.quantity,
        potassium: acc.potassium + item.potassium * item.quantity,
        calcium: acc.calcium + item.calcium * item.quantity,
        magnesium: acc.magnesium + item.magnesium * item.quantity,
      }),
      {
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        sodium: 0,
        potassium: 0,
        calcium: 0,
        magnesium: 0,
      }
    );
  };

  const totals = calculateTotals();

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      '能量胶': 'bg-blue-100 text-blue-800',
      '盐丸': 'bg-orange-100 text-orange-800',
      '能量棒': 'bg-green-100 text-green-800',
      '固体食物': 'bg-purple-100 text-purple-800',
      '运动饮料': 'bg-cyan-100 text-cyan-800',
      '电解质胶囊': 'bg-pink-100 text-pink-800',
      '能量饼干': 'bg-yellow-100 text-yellow-800',
      '其他': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors['其他'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <CalculatorIcon className="w-10 h-10 text-blue-600" />
            越野赛能量补给计算器
          </h1>
          <p className="text-gray-600 text-lg">
            精确计算能量胶、盐丸及其他补给的能量和微量元素摄入量
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 左侧：补给品库 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    补给品库
                  </CardTitle>
                  <CardDescription>选择补给品添加到计算器</CardDescription>
                </div>
                <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  添加新补给品
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && (
                <Card className="mb-4 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-lg">添加新补给品</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="name">名称 *</Label>
                      <Input
                        id="name"
                        value={newSupplement.name}
                        onChange={(e) => setNewSupplement({ ...newSupplement, name: e.target.value })}
                        placeholder="例如：GU Energy Gel"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">类型</Label>
                      <Select value={newSupplement.type} onValueChange={(value) => setNewSupplement({ ...newSupplement, type: value })}>
                        <SelectTrigger id="type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SUPPLEMENT_TYPES.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="calories">能量 (卡路里)</Label>
                        <Input
                          id="calories"
                          type="number"
                          value={newSupplement.calories}
                          onChange={(e) => setNewSupplement({ ...newSupplement, calories: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="carbs">碳水 (克)</Label>
                        <Input
                          id="carbs"
                          type="number"
                          step="0.1"
                          value={newSupplement.carbohydrates}
                          onChange={(e) => setNewSupplement({ ...newSupplement, carbohydrates: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="protein">蛋白质 (克)</Label>
                        <Input
                          id="protein"
                          type="number"
                          step="0.1"
                          value={newSupplement.protein}
                          onChange={(e) => setNewSupplement({ ...newSupplement, protein: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="fat">脂肪 (克)</Label>
                        <Input
                          id="fat"
                          type="number"
                          step="0.1"
                          value={newSupplement.fat}
                          onChange={(e) => setNewSupplement({ ...newSupplement, fat: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="sodium">钠 (毫克)</Label>
                        <Input
                          id="sodium"
                          type="number"
                          value={newSupplement.sodium}
                          onChange={(e) => setNewSupplement({ ...newSupplement, sodium: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="potassium">钾 (毫克)</Label>
                        <Input
                          id="potassium"
                          type="number"
                          value={newSupplement.potassium}
                          onChange={(e) => setNewSupplement({ ...newSupplement, potassium: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="calcium">钙 (毫克)</Label>
                        <Input
                          id="calcium"
                          type="number"
                          value={newSupplement.calcium}
                          onChange={(e) => setNewSupplement({ ...newSupplement, calcium: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="magnesium">镁 (毫克)</Label>
                        <Input
                          id="magnesium"
                          type="number"
                          value={newSupplement.magnesium}
                          onChange={(e) => setNewSupplement({ ...newSupplement, magnesium: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">备注</Label>
                      <Input
                        id="notes"
                        value={newSupplement.notes}
                        onChange={(e) => setNewSupplement({ ...newSupplement, notes: e.target.value })}
                        placeholder="例如：建议每30-45分钟服用"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addSupplement} className="flex-1">
                        <Plus className="w-4 h-4 mr-2" />
                        保存
                      </Button>
                      <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                        取消
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {supplements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    暂无补给品，点击上方按钮添加
                  </div>
                ) : (
                  supplements.map((supplement) => (
                    <Card key={supplement.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getTypeColor(supplement.type)}>
                                {supplement.type}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{supplement.name}</h3>
                            <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                              <div><span className="font-medium">{supplement.calories}</span> 卡</div>
                              <div><span className="font-medium">{Number(supplement.carbohydrates).toFixed(1)}</span>g 碳水</div>
                              <div><span className="font-medium">{supplement.sodium}</span>mg 钠</div>
                              <div><span className="font-medium">{supplement.potassium}</span>mg 钾</div>
                            </div>
                          </div>
                          <Button
                            onClick={() => addToCalculator(supplement)}
                            size="sm"
                            className="shrink-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 右侧：计算器 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5" />
                计算器
              </CardTitle>
              <CardDescription>调整数量查看营养总摄入量</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">选择列表</TabsTrigger>
                  <TabsTrigger value="summary">营养汇总</TabsTrigger>
                </TabsList>

                <TabsContent value="list" className="space-y-2">
                  {selectedSupplements.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      请从左侧添加补给品
                    </div>
                  ) : (
                    selectedSupplements.map((item) => (
                      <Card key={item.id} className="bg-green-50">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={getTypeColor(item.type)}>
                                  {item.type}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                              <p className="text-xs text-gray-600">
                                {item.calories} 卡 × {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCalculator(item.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="summary" className="space-y-4">
                  {selectedSupplements.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      请先添加补给品
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <p className="text-blue-100 text-sm mb-1">总能量</p>
                            <p className="text-3xl font-bold">{totals.calories}</p>
                            <p className="text-blue-100 text-xs mt-1">卡路里</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">宏量营养素</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">碳水化合物</span>
                            <span className="font-semibold text-lg">
                              {totals.carbohydrates.toFixed(1)} 克
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.min((totals.carbohydrates / 100) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">蛋白质</span>
                            <span className="font-semibold text-lg">
                              {totals.protein.toFixed(1)} 克
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">脂肪</span>
                            <span className="font-semibold text-lg">
                              {totals.fat.toFixed(1)} 克
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">微量元素</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">钠</span>
                            <span className="font-semibold text-lg">{totals.sodium} 毫克</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${Math.min((totals.sodium / 1000) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">建议每日摄入量：2300 毫克</p>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">钾</span>
                            <span className="font-semibold text-lg">{totals.potassium} 毫克</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${Math.min((totals.potassium / 3500) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">建议每日摄入量：3500 毫克</p>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">钙</span>
                            <span className="font-semibold text-lg">{totals.calcium} 毫克</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: `${Math.min((totals.calcium / 1000) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">建议每日摄入量：1000 毫克</p>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">镁</span>
                            <span className="font-semibold text-lg">{totals.magnesium} 毫克</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-cyan-500 h-2 rounded-full"
                              style={{ width: `${Math.min((totals.magnesium / 400) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">建议每日摄入量：400 毫克</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 底部建议 */}
        {selectedSupplements.length > 0 && (
          <Card className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                💡 越野赛补给建议
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>能量摄入：</strong>每小时摄入 200-300 卡路里（根据运动强度调整）</li>
                <li>• <strong>碳水化合物：</strong>每小时摄入 30-60 克</li>
                <li>• <strong>电解质：</strong>每小时摄入钠 500-1000 毫克，注意补水</li>
                <li>• <strong>时间安排：</strong>能量胶建议每 30-45 分钟一次，盐丸根据出汗情况调整</li>
                <li>• <strong>注意：</strong>请在训练中测试补给方案，避免比赛时出现肠胃不适</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
