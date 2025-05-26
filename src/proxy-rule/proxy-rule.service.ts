import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ProxyRule } from './proxy-rule.schema'

@Injectable()
export class ProxyRuleService {
  constructor(
    @InjectModel(ProxyRule.name) private proxyRuleModel: Model<ProxyRule>,
  ) {
    this.initializeDefaultRule()
  }

  private async initializeDefaultRule() {
    const count = await this.proxyRuleModel.countDocuments()
    if (count === 0) {
      await this.proxyRuleModel.create({
        name: 'Default JSONPlaceholder Users Rule',
        enabled: true,
        targetPath: '/users',
        loggingEnabled: true,
        whitelistedEndpoints: [],
        blacklistedEndpoints: [],
      })
    }
  }

  async findAll(): Promise<ProxyRule[]> {
    return this.proxyRuleModel.find().sort({ name: 1 }).exec()
  }

  async findOne(id: string): Promise<ProxyRule> {
    const rule = await this.proxyRuleModel.findById(id).exec()
    if (!rule) {
      throw new NotFoundException(`Proxy rule with ID ${id} not found`)
    }
    return rule
  }

  async findByTargetPath(targetPath: string): Promise<ProxyRule[]> {
    return this.proxyRuleModel
      .find({
        targetPath: { $regex: `^${targetPath}` },
        enabled: true,
      })
      .exec()
  }

  async create(createProxyRuleDto: Partial<ProxyRule>): Promise<ProxyRule> {
    const newRule = new this.proxyRuleModel(createProxyRuleDto)
    return newRule.save()
  }

  async update(
    id: string,
    updateProxyRuleDto: Partial<ProxyRule>,
  ): Promise<ProxyRule> {
    const updatedRule = await this.proxyRuleModel
      .findByIdAndUpdate(id, updateProxyRuleDto, { new: true })
      .exec()

    if (!updatedRule) {
      throw new NotFoundException(`Proxy rule with ID ${id} not found`)
    }

    return updatedRule
  }

  async remove(id: string): Promise<void> {
    const result = await this.proxyRuleModel.deleteOne({ _id: id }).exec()
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Proxy rule with ID ${id} not found`)
    }
  }

  async toggleStatus(id: string): Promise<ProxyRule> {
    const rule = await this.findOne(id)
    rule.enabled = !rule.enabled
    return rule.save()
  }

  async toggleLogging(id: string): Promise<ProxyRule> {
    const rule = await this.findOne(id)
    rule.loggingEnabled = !rule.loggingEnabled
    return rule.save()
  }

  async shouldLogRequest(path: string): Promise<boolean> {
    const rules = await this.findByTargetPath(path)

    if (rules.length === 0) {
      return false // No matching rule, don't log
    }

    // Check each matching rule
    for (const rule of rules) {
      // Skip disabled rules
      if (!rule.enabled) continue

      // If logging is disabled for this rule, don't log
      if (!rule.loggingEnabled) continue

      // Check blacklist - if path matches any blacklisted endpoint, don't log
      if (
        rule.blacklistedEndpoints.some((endpoint) => path.startsWith(endpoint))
      ) {
        return false
      }

      // Check whitelist - if whitelist exists and path matches any, then log
      if (rule.whitelistedEndpoints.length > 0) {
        return rule.whitelistedEndpoints.some((endpoint) =>
          path.startsWith(endpoint),
        )
      }

      // No whitelist specified but rule matches and logging is enabled
      return true
    }

    return false // Default to not logging if no specific rule matches
  }
}
