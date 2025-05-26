import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class ProxyRule extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, default: true })
  enabled: boolean

  @Prop({ required: true })
  targetPath: string

  @Prop({ default: false })
  loggingEnabled: boolean

  @Prop({ type: [String], default: [] })
  whitelistedEndpoints: string[]

  @Prop({ type: [String], default: [] })
  blacklistedEndpoints: string[]
}

export const ProxyRuleSchema = SchemaFactory.createForClass(ProxyRule)
