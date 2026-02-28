'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Trash2, Calculator as CalculatorIcon, Package, Mountain, Zap, Droplets, Target, Activity, Flame, Scale } from 'lucide-react';

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

interface RaceParams {
  distance: number;
  elevation: number;
  temperature: number;
  weight: number;
  height: number;
  estimatedTime: number;
  avgHeartRate: number;
}

interface RaceRecommendations {
  hourlyCalories: number;
  hourlyCarbs: number;
  hourlySodium: number;
  hourlyPotassium: number;
  totalCalories: number;
  totalCarbs: number;
  totalSodium: number;
  totalPotassium: number;
  waterIntake: number;
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

  const [raceParams, setRaceParams] = useState<RaceParams>({
    distance: 50,
    elevation: 1500,
    temperature: 20,
    weight: 65,
    height: 170,
    estimatedTime: 8,
    avgHeartRate: 140
  });

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

  // 计算总重量（从notes中提取）
  const calculateTotalWeight = () => {
    return selectedSupplements.reduce((acc, item) => {
      let weight = 0;
      const notes = item.notes || '';
      // 尝试从备注中提取重量（如"60ml", "100ml"等）
      const weightMatch = notes.match(/(\d+)ml/);
      if (weightMatch) {
        weight = parseInt(weightMatch[1], 10);
      } else if (notes.includes('60ml')) {
        weight = 60;
      } else if (notes.includes('90ml')) {
        weight = 90;
      } else if (notes.includes('100ml')) {
        weight = 100;
      } else if (notes.includes('120ml')) {
        weight = 120;
      } else if (notes.includes('180ml')) {
        weight = 180;
      } else if (notes.includes('200ml')) {
        weight = 200;
      }
      return acc + weight * item.quantity;
    }, 0);
  };

  const totalWeight = calculateTotalWeight();

  const calculateRaceRecommendations = (): RaceRecommendations => {
    const { distance, elevation, temperature, weight, estimatedTime, avgHeartRate } = raceParams;

    const baseMetabolicRate = weight * 1.2;
    const elevationFactor = elevation * 0.001;
    const intensityFactor = avgHeartRate / 140;
    const tempFactor = temperature > 25 ? 1.15 : (temperature < 10 ? 1.05 : 1.0);

    const hourlyCalories = Math.round(baseMetabolicRate * intensityFactor * elevationFactor * tempFactor * 4);
    const hourlyCarbs = Math.round(hourlyCalories * 0.6 / 4);

    const sweatRate = 0.8 * intensityFactor * tempFactor;
    const hourlySodium = Math.round(sweatRate * 800);
    const hourlyPotassium = Math.round(sweatRate * 200);

    const waterIntake = sweatRate;

    const totalCalories = Math.round(hourlyCalories * estimatedTime);
    const totalCarbs = Math.round(hourlyCarbs * estimatedTime);
    const totalSodium = Math.round(hourlySodium * estimatedTime);
    const totalPotassium = Math.round(hourlyPotassium * estimatedTime);

    return {
      hourlyCalories: Math.min(Math.max(hourlyCalories, 200), 400),
      hourlyCarbs: Math.min(Math.max(hourlyCarbs, 30), 90),
      hourlySodium: Math.min(Math.max(hourlySodium, 300), 1200),
      hourlyPotassium: Math.min(Math.max(hourlyPotassium, 100), 400),
      totalCalories,
      totalCarbs,
      totalSodium,
      totalPotassium,
      waterIntake: Math.round(waterIntake * 100) / 100
    };
  };

  const recommendations = calculateRaceRecommendations();

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      '能量胶': 'bg-blue-50 text-blue-700',
      '盐丸': 'bg-orange-50 text-orange-700',
      '能量棒': 'bg-green-50 text-green-700',
      '固体食物': 'bg-purple-50 text-purple-700',
      '运动饮料': 'bg-cyan-50 text-cyan-700',
      '电解质胶囊': 'bg-pink-50 text-pink-700',
      '能量饼干': 'bg-yellow-50 text-yellow-700',
      '其他': 'bg-gray-50 text-gray-700'
    };
    return colors[type] || colors['其他'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <CalculatorIcon className="w-6 h-6 text-blue-600" />
            越野赛能量补给计算器
          </h1>
          <p className="text-gray-500 text-sm">
            基于科学研究的专业补给规划工具
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1">
            <TabsTrigger value="calculator" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CalculatorIcon className="w-4 h-4 mr-2" />
              补给计算器
            </TabsTrigger>
            <TabsTrigger value="planner" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Target className="w-4 h-4 mr-2" />
              比赛补给规划
            </TabsTrigger>
          </TabsList>

          {/* 补给计算器 */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* 左侧：补给品库 */}
              <Card className="shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                        <Package className="w-5 h-5 text-gray-500" />
                        补给品库
                      </CardTitle>
                      <CardDescription className="text-gray-500">选择补给品添加到计算器</CardDescription>
                    </div>
                    <Button onClick={() => setShowAddForm(!showAddForm)} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-1" />
                      添加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {showAddForm && (
                    <Card className="mb-4 bg-blue-50 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base text-gray-900">添加新补给品</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label htmlFor="name" className="text-gray-700 text-sm">名称 *</Label>
                          <Input
                            id="name"
                            value={newSupplement.name}
                            onChange={(e) => setNewSupplement({ ...newSupplement, name: e.target.value })}
                            placeholder="例如：能量胶"
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type" className="text-gray-700 text-sm">类型</Label>
                          <Select value={newSupplement.type} onValueChange={(value) => setNewSupplement({ ...newSupplement, type: value })}>
                            <SelectTrigger id="type" className="bg-white border-gray-300">
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
                            <Label htmlFor="calories" className="text-gray-700 text-sm">能量 (卡)</Label>
                            <Input
                              id="calories"
                              type="number"
                              value={newSupplement.calories}
                              onChange={(e) => setNewSupplement({ ...newSupplement, calories: Number(e.target.value) })}
                              className="bg-white border-gray-300"
                            />
                          </div>
                          <div>
                            <Label htmlFor="carbs" className="text-gray-700 text-sm">碳水 (g)</Label>
                            <Input
                              id="carbs"
                              type="number"
                              step="0.1"
                              value={newSupplement.carbohydrates}
                              onChange={(e) => setNewSupplement({ ...newSupplement, carbohydrates: Number(e.target.value) })}
                              className="bg-white border-gray-300"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label htmlFor="protein" className="text-gray-700 text-xs">蛋白质</Label>
                            <Input
                              id="protein"
                              type="number"
                              step="0.1"
                              value={newSupplement.protein}
                              onChange={(e) => setNewSupplement({ ...newSupplement, protein: Number(e.target.value) })}
                              className="bg-white border-gray-300 text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="fat" className="text-gray-700 text-xs">脂肪</Label>
                            <Input
                              id="fat"
                              type="number"
                              step="0.1"
                              value={newSupplement.fat}
                              onChange={(e) => setNewSupplement({ ...newSupplement, fat: Number(e.target.value) })}
                              className="bg-white border-gray-300 text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sodium" className="text-gray-700 text-xs">钠</Label>
                            <Input
                              id="sodium"
                              type="number"
                              value={newSupplement.sodium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, sodium: Number(e.target.value) })}
                              className="bg-white border-gray-300 text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="potassium" className="text-gray-700 text-xs">钾</Label>
                            <Input
                              id="potassium"
                              type="number"
                              value={newSupplement.potassium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, potassium: Number(e.target.value) })}
                              className="bg-white border-gray-300 text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="calcium" className="text-gray-700 text-xs">钙 (mg)</Label>
                            <Input
                              id="calcium"
                              type="number"
                              value={newSupplement.calcium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, calcium: Number(e.target.value) })}
                              className="bg-white border-gray-300 text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="magnesium" className="text-gray-700 text-xs">镁 (mg)</Label>
                            <Input
                              id="magnesium"
                              type="number"
                              value={newSupplement.magnesium}
                              onChange={(e) => setNewSupplement({ ...newSupplement, magnesium: Number(e.target.value) })}
                              className="bg-white border-gray-300 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="notes" className="text-gray-700 text-sm">备注</Label>
                          <Input
                            id="notes"
                            value={newSupplement.notes}
                            onChange={(e) => setNewSupplement({ ...newSupplement, notes: e.target.value })}
                            placeholder="例如：建议每30-45分钟服用"
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={addSupplement} className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Plus className="w-4 h-4 mr-1" />
                            保存
                          </Button>
                          <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                            取消
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {supplements.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        暂无补给品，点击上方按钮添加
                      </div>
                    ) : (
                      supplements.map((supplement) => (
                        <Card key={supplement.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getTypeColor(supplement.type)}>
                                    {supplement.type}
                                  </Badge>
                                </div>
                                <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{supplement.name}</h3>
                                <div className="grid grid-cols-3 gap-1 text-xs text-gray-500">
                                  <div><span className="text-blue-600 font-medium">{supplement.calories}</span> 卡</div>
                                  <div><span className="text-green-600 font-medium">{Number(supplement.carbohydrates).toFixed(0)}</span>g 碳水</div>
                                  <div><span className="text-orange-600 font-medium">{supplement.sodium}</span>mg 钠</div>
                                </div>
                              </div>
                              <Button
                                onClick={() => addToCalculator(supplement)}
                                size="sm"
                                className="shrink-0 bg-blue-600 hover:bg-blue-700"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 中间：选择列表 */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5 text-gray-500" />
                    已选择补给品
                  </CardTitle>
                  <CardDescription className="text-gray-500">调整数量查看营养总摄入量</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSupplements.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      请从左侧添加补给品
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      {selectedSupplements.map((item) => (
                        <Card key={item.id} className="bg-blue-50 border-blue-200">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge className={getTypeColor(item.type)}>
                                    {item.type}
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                                <p className="text-xs text-gray-600">
                                  {item.calories} 卡 × {item.quantity} = {item.calories * item.quantity} 卡
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
                                <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromCalculator(item.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 右侧：营养汇总 */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 text-gray-500" />
                    营养汇总
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedSupplements.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      请先添加补给品
                    </div>
                  ) : (
                    <>
                      {/* 总能量 */}
                      <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Flame className="w-4 h-4 text-orange-600" />
                          <p className="text-gray-600 text-sm">总能量</p>
                        </div>
                        <p className="text-4xl font-semibold text-gray-900">{totals.calories}</p>
                        <p className="text-gray-500 text-xs mt-1">卡路里</p>
                      </div>

                      {/* 总重量 */}
                      {totalWeight > 0 && (
                        <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Scale className="w-4 h-4 text-gray-600" />
                            <p className="text-gray-600 text-xs">总重量</p>
                          </div>
                          <p className="text-2xl font-semibold text-gray-900">{totalWeight}</p>
                          <p className="text-gray-500 text-xs mt-1">毫升</p>
                        </div>
                      )}

                      {/* 宏量营养素 */}
                      <Card className="bg-gray-50 border-gray-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-gray-900">宏量营养素</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">碳水化合物</span>
                              <span className="font-medium text-gray-900">{totals.carbohydrates.toFixed(1)} 克</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((totals.carbohydrates / 100) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">蛋白质</span>
                            <span className="font-medium text-gray-900">{totals.protein.toFixed(1)} 克</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">脂肪</span>
                            <span className="font-medium text-gray-900">{totals.fat.toFixed(1)} 克</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* 微量元素 */}
                      <Card className="bg-gray-50 border-gray-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base text-gray-900">微量元素</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">钠</span>
                              <span className="font-medium text-gray-900">{totals.sodium} 毫克</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((totals.sodium / 1000) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">建议每日摄入量：2300 毫克</p>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">钾</span>
                              <span className="font-medium text-gray-900">{totals.potassium} 毫克</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((totals.potassium / 3500) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">建议每日摄入量：3500 毫克</p>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">钙</span>
                              <span className="font-medium text-gray-900">{totals.calcium} 毫克</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((totals.calcium / 1000) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">建议每日摄入量：1000 毫克</p>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">镁</span>
                              <span className="font-medium text-gray-900">{totals.magnesium} 毫克</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-cyan-500 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((totals.magnesium / 400) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">建议每日摄入量：400 毫克</p>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 底部建议 */}
            {selectedSupplements.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    越野赛补给建议
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>能量摄入：</strong>每小时摄入 200-300 卡路里</li>
                    <li>• <strong>碳水化合物：</strong>每小时摄入 30-60 克</li>
                    <li>• <strong>电解质：</strong>每小时摄入钠 500-1000 毫克</li>
                    <li>• <strong>时间安排：</strong>能量胶建议每 30-45 分钟一次</li>
                    <li>• <strong>注意：</strong>请在训练中测试补给方案，避免肠胃不适</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 比赛补给规划 */}
          <TabsContent value="planner" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* 比赛参数输入 */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                    <Mountain className="w-5 h-5 text-gray-500" />
                    比赛参数
                  </CardTitle>
                  <CardDescription className="text-gray-500">输入比赛和身体参数以计算补给需求</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="distance" className="text-gray-700">比赛距离</Label>
                      <Input
                        id="distance"
                        type="number"
                        value={raceParams.distance}
                        onChange={(e) => setRaceParams({ ...raceParams, distance: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="elevation" className="text-gray-700">爬升高度 (米)</Label>
                      <Input
                        id="elevation"
                        type="number"
                        value={raceParams.elevation}
                        onChange={(e) => setRaceParams({ ...raceParams, elevation: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temperature" className="text-gray-700">比赛温度 (°C)</Label>
                      <Input
                        id="temperature"
                        type="number"
                        value={raceParams.temperature}
                        onChange={(e) => setRaceParams({ ...raceParams, temperature: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedTime" className="text-gray-700">预计完赛时间 (小时)</Label>
                      <Input
                        id="estimatedTime"
                        type="number"
                        step="0.5"
                        value={raceParams.estimatedTime}
                        onChange={(e) => setRaceParams({ ...raceParams, estimatedTime: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="weight" className="text-gray-700">体重 (公斤)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={raceParams.weight}
                        onChange={(e) => setRaceParams({ ...raceParams, weight: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-gray-700">身高 (厘米)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={raceParams.height}
                        onChange={(e) => setRaceParams({ ...raceParams, height: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="avgHeartRate" className="text-gray-700">平均心率</Label>
                      <Input
                        id="avgHeartRate"
                        type="number"
                        value={raceParams.avgHeartRate}
                        onChange={(e) => setRaceParams({ ...raceParams, avgHeartRate: Number(e.target.value) })}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>

                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        计算依据
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        基于 ACSM（美国运动医学会）公式和越野跑科学研究，结合心率强度、爬升高度、环境温度等因子综合计算能量消耗和电解质需求。
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* 补给推荐 */}
              <div className="space-y-4">
                {/* 每小时补给 */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                      <Zap className="w-5 h-5 text-gray-500" />
                      每小时补给建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <p className="text-gray-600 text-sm mb-1">能量</p>
                        <p className="text-3xl font-semibold text-gray-900">{recommendations.hourlyCalories}</p>
                        <p className="text-gray-500 text-xs mt-1">卡/小时</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
                        <p className="text-gray-600 text-sm mb-1">碳水</p>
                        <p className="text-3xl font-semibold text-gray-900">{recommendations.hourlyCarbs}</p>
                        <p className="text-gray-500 text-xs mt-1">克/小时</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <p className="text-gray-600 text-sm mb-1">钠</p>
                        <p className="text-2xl font-semibold text-gray-900">{recommendations.hourlySodium}</p>
                        <p className="text-gray-500 text-xs mt-1">毫克/小时</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-gray-600 text-sm mb-1">钾</p>
                        <p className="text-2xl font-semibold text-gray-900">{recommendations.hourlyPotassium}</p>
                        <p className="text-gray-500 text-xs mt-1">毫克/小时</p>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                      <p className="text-gray-600 text-sm mb-1">建议补水量</p>
                      <p className="text-3xl font-semibold text-gray-900">{recommendations.waterIntake}</p>
                      <p className="text-gray-500 text-xs mt-1">升/小时</p>
                    </div>
                  </CardContent>
                </Card>

                {/* 总量需求 */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900 flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5 text-gray-500" />
                      比赛总需求
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      预计 {raceParams.estimatedTime} 小时完赛
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">总能量需求</span>
                      <span className="text-xl font-semibold text-gray-900">{recommendations.totalCalories} 卡</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">总碳水需求</span>
                      <span className="text-xl font-semibold text-gray-900">{recommendations.totalCarbs} 克</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">总钠需求</span>
                      <span className="text-xl font-semibold text-gray-900">{recommendations.totalSodium} 毫克</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">总钾需求</span>
                      <span className="text-xl font-semibold text-gray-900">{recommendations.totalPotassium} 毫克</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600">总补水量</span>
                      <span className="text-xl font-semibold text-gray-900">{(recommendations.waterIntake * raceParams.estimatedTime).toFixed(1)} 升</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 专家建议 */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  专家补给建议
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>能量胶使用：</strong>根据每小时 {recommendations.hourlyCarbs}g 碳水需求，可使用 {Math.ceil(recommendations.hourlyCarbs / 25)}-{" "}{Math.ceil(recommendations.hourlyCarbs / 20)} 个能量胶</li>
                  <li>• <strong>电解质补充：</strong>每小时需要 {recommendations.hourlySodium}mg 钠，建议使用电解质片或含钠运动饮料</li>
                  <li>• <strong>补水策略：</strong>每小时补充 {recommendations.waterIntake} 升水，分多次小口饮用</li>
                  <li>• <strong>时间安排：</strong>建议每 30-45 分钟补给一次，提前规划补给站或自备补给</li>
                  <li>• <strong>温度提醒：</strong>当前温度 {raceParams.temperature}°C，高温时需增加补水量和电解质摄入</li>
                  <li>• <strong>训练建议：</strong>所有补给方案应在训练中测试，确保肠胃适应</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
